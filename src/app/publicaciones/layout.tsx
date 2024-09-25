"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function PublicacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChosen, setIsChosen] = useState(false);

  return (
    <>
      <nav className="grid grid-cols-2 ">
        <button
          onClick={() => setIsChosen(true)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Mis Publicaciones
        </button>
        <button
          onClick={() => setIsChosen(false)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${!isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Usuarios
        </button>
      </nav>

      <div className="bg-gray-200">
        <div className="ml-3 py-3">
          <Button variant="upload">+ Publicar</Button>
        </div>

        {children}
      </div>
    </>
  );
}
