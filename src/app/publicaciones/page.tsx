"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import PostCards from "~/components/PostCards";
import { useMyContext } from "~/utils/posts/layoutContext";
import { useAuth } from "@clerk/nextjs";

export default function publicaciones() {
  const { value } = useMyContext();
  const { userId } = useAuth();
  return (
    <main className="flex flex-col bg-gradient-to-r from-primary-50 to-purple-50">
      <div className="ml-3 py-3">
        <Button variant="upload">
          <Link href="/publicaciones/agregar">+ Publicar</Link>
        </Button>
      </div>
      {value ? <PostCards userId={userId} /> : <PostCards userId={null} />}
    </main>
  );
}

//mx-auto grid w-full h-full max-w-5xl gap-4 p-3 md:grid-cols-2
