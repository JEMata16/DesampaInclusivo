"use client";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { set } from "zod";
import { CantonComboBox } from "~/components/ProvinciaComboBox";
import { ProvinciaComboBox } from "~/components/ProvinciaComboBox";
import RatingStars from "~/components/RatingStars";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
type Province = {
  id: number | undefined;
  name: string | undefined;
};

type Canton = {
  name: string | undefined;
}
export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const { userId } = useAuth();
  const [rating, setRating] = useState(0);
  const [provincia, setProvincia] = useState<Province | null>(null);
  const [canton, setCanton] = useState<Canton | null>(null); 
  const [description, setDescription] = useState("");

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

    if (!selectedFile) {
      setMessage("Seleccione un archivo.");
      return;
    }

    if (description.trim() === "") {
      setMessage("Por favor ingrese una descripción.");
      return;
    }

    if (!provincia) {
      setMessage("Por favor seleccione una provincia.");
      return;
    }

    if(!rating) {
      setMessage("Por favor seleccione una puntuación.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("descripcion", description);
    formData.append("provincia", (provincia?.name ?? "").toString());
    formData.append("canton", (canton?.name ?? "").toString());
    formData.append("rating", rating.toString());


    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: { userId: userId ?? "" },
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex min-h-screen flex-col py-5 text-blue-500">
      <div className="m-5 p-8">
        <h1 className="mb-4 text-left text-3xl font-bold">Publicar</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form
          className="flex max-w-md flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Imagen</Label>
            <Input id="file" type="file" onChange={handleFileChange}/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Descripción</Label>
            <Textarea id="description" placeholder="Agrega una descripción" onChange={(e) => setDescription(e.target.value)}/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Provincia</Label>
            <ProvinciaComboBox  onProvinciaSelect={(data) => setProvincia(data)}/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Cantón (opcional)</Label>
            <CantonComboBox provinceId={provincia?.id} onCantonSelect={(data) => setCanton(data)}/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label>
              Calificación según el nivel de accesibilidad
            </Label>
           <RatingStars rating={rating} onChange={handleRatingChange} size={9}/>
          </div>
          
          
          <Button variant="default" type="submit">
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
}
