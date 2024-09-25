import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function publicaciones() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-200">
      <div className="ml-3 py-3">
        <Button variant="upload">
          <Link href="/publicaciones/agregar">+ Publicar</Link>
        </Button>
      </div>
      Publicaciones
    </main>
  );
}
