"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import CalendarFormBtn from "./CalendarFormBtn";


type CapacitacionesData = {
  name: string;
  description: string;
  link?: string;
  date: Date; // YYYY-MM-DD
  time: string; // HH:MM
  file?: File | null;
};

type PostFormProps = {
  mode: "create" | "edit";
  capcId?: string; // Required in edit mode
  initialData?: CapacitacionesData; // Optional, for prefilling data in edit mode
};

export default function CapacitacionesForm({ mode, capcId, initialData }: PostFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [date, setDate] = useState<Date | undefined>(initialData?.date || undefined);
  const [time, setTime] = useState(initialData?.time || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(initialData?.file || null);
  const [message, setMessage] = useState("");

  const { userId } = useAuth();

  useEffect(() => {
    if (mode === "edit" && capcId) {
      // Fetch the existing training data to prefill the form
      const fetchCapcData = async () => {
        const response = await fetch(
          `/api/training/${capcId}`,
          {
            headers: { userId: userId ?? "" },
            method: "GET"
          },
        );
        const data = await response.json();
        console.log(data.capacitaciones[0]);
        const capc = data.capacitaciones[0];
        setName(capc.name);
        setDescription(capc.description);
        setLink(capc.link);
        setDate(capc.date); 
        setTime(capc.time);
        // The image file cannot be prefilled; users must upload a new one if needed
      };
      fetchCapcData();
    }
  }, [mode, capcId]);

  const handleDateChange = (day: Date | undefined) => {
    if (day) { 
      console.log(day);
      setDate(day);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setMessage("Por favor ingrese una descripción.");
      return;
    }

    if (!date) {
      setMessage("Por favor seleccione una fecha.");
      return;
    }

    if (!time) {
      setMessage("Por favorse seleccione una hora.");
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("descripcion", description);
    formData.append("link", (link ?? "").toString());
    formData.append("date", date.toISOString());
    formData.append("time", (time ?? "").toString());

    const url = mode === "create" ? "/api/training/upload" : `/api/training/${capcId}`;
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
          {mode === "create" ? "Crear Capacitación" : "Editar Capacitación"}
        </h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form
          className="flex max-w-md flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Imagen</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Nombre</Label>
            <Input id="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre de la capacitación"/>
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
            <Label>Link</Label>
            <Input id="link" type="text" onChange={(e) => setLink(e.target.value)} placeholder="Opcional" ></Input>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Fecha</Label>
            {/* <Input id="date" type="date" onChange={handleDateChange} /> */}
            <CalendarFormBtn onSelect={handleDateChange} selected={date}/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label>Hora</Label>
            <Input id="time" type="time" onChange={(e) => setTime(e.target.value)} />
          </div>


          <Button variant="upload" type="submit">
            {mode === "create" ? "Publicar" : "Guardar Cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
}
