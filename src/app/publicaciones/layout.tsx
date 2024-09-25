"use client";

import { useState } from "react";

export default function PublicacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChosen, setIsChosen] = useState(true);

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

      <div className="min-h-screen bg-gray-200">{children}</div>
    </>
  );
}
