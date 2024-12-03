"use client";

import Link from "next/link";
import { Suspense, useContext, useEffect } from "react";
import { Button } from "~/components/ui/button";

import PostCards from "~/components/PostCards";
import { useAuth } from "@clerk/nextjs";
import { useMyContext } from "~/utils/posts/layoutContext";

export default function publicaciones() {
  const { value } = useMyContext();
  
  return (
    <main className="flex flex-col  bg-gray-200">
      <div className="ml-3 py-3">
        <Button variant="upload">
          <Link href="/publicaciones/agregar">+ Publicar</Link>
        </Button>
      </div>
      {value ? (
        <div className="mx-auto grid w-full h-full max-w-5xl gap-4 p-3 md:grid-cols-2 ">
          <PostCards />
        </div>
      ) : (
        "false"
      )}
    </main>
  );
}
