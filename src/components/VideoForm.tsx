"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";


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
  const [title, setTitle] = useState(initialData?.title || "");
  const [video, setVideo] = useState("");
  const [message, setMessage] = useState("");
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
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex min-h-screen flex-col py-5 text-blue-500">
      <div className="m-5 p-8">
        <h1 className="mb-4 text-left text-3xl font-bold">
          {mode === "create" ? "Agregar Video" : "Editar Video"}
        </h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form
          className="flex max-w-md flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Video</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Titulo</Label>
            <Textarea
              id="title"
              placeholder="Agrega un titulo para tu video"
              value={title}
              style={{color: "black"}}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button variant="default" type="submit">
            {mode === "create" ? "Publicar" : "Guardar Cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
}
