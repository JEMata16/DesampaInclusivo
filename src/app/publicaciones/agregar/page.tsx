"use client";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { CantonComboBox } from "~/components/ProvinciaComboBox";
import { ProvinciaComboBox } from "~/components/ProvinciaComboBox";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const { userId } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: { userId: userId ?? "" },
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    // <div className="self-center">
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" onChange={handleFileChange} />
    //     <button type="submit">Upload File</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>

    <div className="flex min-h-screen flex-col py-5 text-blue-500">
      <div className="m-5 p-8">
        <h1 className="mb-4 text-left text-3xl font-bold">Publicar</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form className="space-y-3 max-w-md flex flex-col" onSubmit={handleSubmit}>
          {/* <input
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit">Upload File</button> */}
          
          <Label htmlFor="picture">Imagen</Label>
          <Input id="file" type="file" />
         
            <Label htmlFor="">Descripción</Label>
            <Textarea id="description" placeholder="Agrega una descripción" />
         
          
            <Label htmlFor="">Provincia</Label>
            <ProvinciaComboBox />
          
          
            <Label htmlFor="">Cantón (opcional)</Label>
            <CantonComboBox />

            <Label htmlFor="">Calificación según el nivel de accesibilidad</Label>
         
          <Button variant="default" type="submit">Publicar</Button>
        </form>
      </div>
    </div>
  );
}
