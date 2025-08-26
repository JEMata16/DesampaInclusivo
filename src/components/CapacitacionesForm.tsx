"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import CalendarFormBtn from "./CalendarFormBtn";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


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
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMessage, setDrawerMessage] = useState("");
  const [drawerError, setDrawerError] = useState(false);

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (day < today) {
        setMessage("¡Lo sentimos! No puede seleccionar una fecha anterior a la actual.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }
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
      setMessage("¡Lo sentimos! La descripción no puede estar vacía.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (!date) {
      setMessage("¡Lo sentimos! Debe seleccionar una fecha.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    if (!time) {
      setMessage("¡Lo sentimos! Debe seleccionar una hora.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("description", description);
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
    if (data.message || !data.error) {
      setDrawerMessage("¡Capacitación publicada exitosamente! Redirigiendo...");
      setDrawerError(false);
      setDrawerVisible(true);
      setTimeout(() => {
        setDrawerVisible(false);
        router.push("/capacitaciones");
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
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-primary-50 to-purple-50 pt-8">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 mt-4">
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
            aria-label="Volver a capacitaciones"
            onClick={() => router.push("/capacitaciones")}
            className="mr-2 p-2 rounded-full hover:bg-primary-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-primary-600" />
          </button>
          <h1 className="text-3xl font-extrabold text-primary-600">
            {mode === "create" ? "Crear Capacitación" : "Editar Capacitación"}
          </h1>
        </div>
        <p className="mb-6 text-gray-500">
          Agrega una capacitación para que los usuarios puedan visualizarla.
        </p>
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
            <Input id="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre de la capacitación" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Descripción</Label>
            <Textarea
              id="description"
              placeholder="Agrega una descripción"
              value={description}
              style={{ color: "black" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Enlace</Label>
            <Input id="link" type="text" onChange={(e) => setLink(e.target.value)} placeholder="Opcional" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Fecha</Label>
            <CalendarFormBtn onSelect={handleDateChange} selected={date} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
            <Label>Hora</Label>
            <Input id="time" type="time" onChange={(e) => setTime(e.target.value)} />
          </div>

          <Button
            variant="default"
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            {mode === "create" ? "Publicar" : "Guardar Cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
}
