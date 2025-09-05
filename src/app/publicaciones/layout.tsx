"use client";

import { useMyContext } from "~/utils/posts/layoutContext";
import { usePathname } from "next/navigation";



export default function PublicacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: isChosen, setValue } = useMyContext();
  const pathname = usePathname();

  const hideTabs =
    pathname === "/publicaciones/agregar" ||
    pathname.startsWith("/publicaciones/editar");

  return (
    <>
      {!hideTabs && (
        <nav className="grid grid-cols-2">
          <button
            onClick={() => setValue(true)}
            className={`flex items-center font-semibold justify-center rounded-t-lg py-2  ${isChosen ? "bg-gray-200" : "hover:bg-purple-50"} `}
          >
            Mis Publicaciones
          </button>
          <button
            onClick={() => setValue(false)}
            className={`flex items-center font-semibold justify-center rounded-t-lg py-2  ${!isChosen ? "bg-gray-200" : "hover:bg-primary-50"} `}
          >
            Publicaciones
          </button>
        </nav>
      )}
      <div className="static min-h-screen">{children}</div>
    </>
  );
}
