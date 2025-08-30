"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft } from "lucide-react";


type PostData = {
  title: string;
  file?: File | null;
};

type PostFormProps = {
  mode: "create" | "edit";
  videoId?: string; // Required in edit mode
  initialData?: PostData; // Optional, for prefilling data in edit mode
};

export default function VideoForm({ mode, videoId, initialData }: PostFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(initialData?.file || null);
  const [message, setMessage] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMessage, setDrawerMessage] = useState("");
  const [drawerError, setDrawerError] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [video, setVideo] = useState("");
  const { userId } = useAuth();


  useEffect(() => {
    if (mode === "edit" && videoId) {
      // Fetch the existing post data to prefill the form
      const fetchPostData = async () => {
        const response = await fetch(
          `/api/videos/${videoId}`,
          {
            headers: { userId: userId ?? "" },
            method: "GET"
          },
        );
        const data = await response.json();
        console.log(data.posts[0]);
        const video = data.posts[0];
        setTitle(video.title);
        setVideo(video.url);
        // The image file cannot be prefilled; users must upload a new one if needed
      };
      fetchPostData();
    }
  }, [mode, videoId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Por favor ingrese una descripción.");
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("title", title);

    const url = mode === "create" ? "/api/videos/upload" : `/api/videos/${videoId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      body: formData,
      headers: { userId: userId ?? "" },
    });

    const data = await response.json();
    if (data.message || !data.error) {
      setDrawerMessage("¡Vídeo publicado exitosamente! Redirigiendo...");
      setDrawerError(false);
      setDrawerVisible(true);
      setTimeout(() => {
        setDrawerVisible(false);
        router.push("/videos");
      }, 2000);
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
    <div className="flex min-h-screen flex-col items-center justify-start pt-12 bg-gradient-to-r from-primary-50 to-purple-50">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
        {message && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-100 p-4 text-red-700 shadow-md animate-fade-in">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{message}</span>
          </div>
        )}
        {drawerVisible && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-lg p-4 shadow-md animate-fade-in ${drawerError
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
              }`}
          >
            {drawerError ? (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className="font-semibold">{drawerMessage}</span>
          </div>
        )}

        <div className="flex items-center mb-2">
          <button
            type="button"
            aria-label="Volver a vídeos"
            onClick={() => router.push("/videos")}
            className="mr-2 p-2 rounded-full hover:bg-primary-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-blue-600" />
          </button>
          <h1 className="mb-4 text-left text-3xl font-bold">
            {mode === "create" ? "Agregar Video" : "Editar Video"}
          </h1>
        </div>
        <p className="mb-6 text-gray-500">
          Comparte vídeos referentes a Ya! Danza para que puedan ser visualizados por los usuarios.
        </p>

        <form
          className="flex max-w-md flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Vídeo</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Título</Label>
            <Textarea
              id="title"
              placeholder="Agrega un título para tu vídeo"
              value={title}
              style={{ color: "black" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button variant="default" type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
            {mode === "create" ? "Publicar" : "Guardar Cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
}