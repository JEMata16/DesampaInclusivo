"use client";

import { useMyContext } from "~/utils/posts/layoutContext";



export default function PublicacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: isChosen, setValue } = useMyContext();

  return (
    <>
      <nav className="grid grid-cols-2">
        <button
          onClick={() => setValue(true)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Mis Publicaciones
        </button>
        <button
          onClick={() => setValue(false)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${!isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Publicaciones
        </button>
      </nav>

      <div className="static min-h-screen bg-gray-200">{children}</div>
    </>
  );
}
