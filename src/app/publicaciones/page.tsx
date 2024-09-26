'use client';

import Link from "next/link";
import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { useMyContext } from "./layout";



export default function publicaciones() {
  const {value} = useMyContext();
  return (
    <main className="flex min-h-screen flex-col bg-gray-200">
      <div className="ml-3 py-3">
        <Button variant="upload">
          <Link href="/publicaciones/agregar">+ Publicar</Link>
        </Button>
      </div>
      <p>{value ? "true" : "false"}</p>
    </main>
  );
}



