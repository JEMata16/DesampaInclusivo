"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CantonComboBox, ProvinciaComboBox } from "~/components/ProvinciaComboBox";
import RatingStars from "~/components/RatingStars";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Drawer } from "~/components/ui/drawer";

type Province = {
  id: number | undefined;
  name: string | undefined;
};

type Canton = {
  name: string | undefined;
};

type PostData = {
  description: string;
  provincia: Province | null;
  canton: Canton | null;
  rating: number;
  file?: File | null;
};

type PostFormProps = {
  mode: "create" | "edit";
  postId?: string; // Required in edit mode
  initialData?: PostData; // Optional, for prefilling data in edit mode
};

export default function PostForm({ mode, postId, initialData }: PostFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(initialData?.file || null);
  const [message, setMessage] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMessage, setDrawerMessage] = useState("");
  const [drawerError, setDrawerError] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [provincia, setProvincia] = useState<Province | null>(initialData?.provincia || null);
  const [canton, setCanton] = useState<Canton | null>(initialData?.canton || null);
  const [description, setDescription] = useState(initialData?.description || "");
  
  useEffect(() => {
    if (mode === "edit" && postId) {
      // Fetch the existing post data to prefill the form
      const fetchPostData = async () => {
        const response = await fetch(
          `/api/posts/${postId}`,
          {
            headers: { userId: userId ?? "" },
            method: "GET"
          },
        );
        const data = await response.json();
        const post = data.posts[0];
        setDescription(post.description);
        setProvincia(post.provincia);
        setCanton(post.canton);
        setRating(post.rating);
        // The image file cannot be prefilled; users must upload a new one if needed
      };
      fetchPostData();
    }
  }, [mode, postId]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setMessage("¡Lo sentimos! La descripción no puede estar vacía.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (!provincia) {
      setMessage("¡Lo sentimos! Debe seleccionar una provincia.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (!rating) {
      setMessage("¡Lo sentimos! Debe seleccionar una calificación.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("descripcion", description);
    formData.append("provincia", (provincia?.name ?? "").toString());
    formData.append("canton", (canton?.name ?? "").toString());
    formData.append("rating", rating.toString());

    const url = mode === "create" ? "/api/posts/upload" : `/api/posts/${postId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      body: formData,
      headers: { userId: userId ?? "" },
    });

    const data = await response.json();
    if (data.message || !data.error) {
      setDrawerMessage("¡Publicación realizada exitosamente! Redirigiendo...");
      setDrawerError(false);
      setDrawerVisible(true);
      setTimeout(() => {
        setDrawerVisible(false);
        router.push("/publicaciones");
      }, 3000);
    } else {
      setDrawerMessage(data.error || "¡Lo sentimos! Ocurrió un error al publicar.");
      setDrawerError(true);
      setDrawerVisible(true);
      setTimeout(() => {
        setDrawerVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col py-5 text-blue-500">
      <div className="m-5 p-8">
        <h1 className="mb-4 text-left text-3xl font-bold">
          {mode === "create" ? "Publicar" : "Editar Publicación"}
        </h1>
        {message && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 shadow-md">
            {message}
            </div>)}
        <form
          className="flex max-w-md flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Imagen</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Descripción</Label>
            <Textarea
              id="description"
              placeholder="Agrega una descripción"
              value={description}
              style={{color: "black"}}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Provincia</Label>
            <ProvinciaComboBox
              onProvinciaSelect={(data) => setProvincia(data)}
              selectedProvincia={provincia}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Cantón (opcional)</Label>
            <CantonComboBox
              provinceId={provincia?.id}
              onCantonSelect={(data) => setCanton(data)}
              selectedCanton={canton}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label>Calificación según el nivel de accesibilidad</Label>
            <RatingStars rating={rating} onChange={handleRatingChange} />
          </div>

          <Button variant="default" type="submit">
            {mode === "create" ? "Publicar" : "Guardar Cambios"}
          </Button>
        </form>
      </div>
      {drawerVisible && (
  <Drawer>
    <div
      className={`p-4 text-center ${
        drawerError ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
      } rounded-lg shadow-md flex flex-col items-center`}
    >
      {!drawerError ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-700 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-700 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}

      <p className="text-lg font-semibold">{drawerMessage}</p>
    </div>
  </Drawer>
)}
  </div>
  );
}
