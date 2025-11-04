import Link from "next/link";
import { Button } from "~/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import ClientPostLoader from "./postloader";

export const revalidate = 30;

export default async function PublicacionesPage() {
  const user = await currentUser();

  // The context state (value) is client-side, so we can’t read it here directly.
  // Instead, we render a small client component that reads it and fetches accordingly.
  return (
    <main className="flex flex-col bg-gradient-to-r from-primary-50 to-purple-50 min-h-screen">
      <div className="ml-3 py-3">
        <Button variant="upload">
          <Link href="/publicaciones/agregar">+ Publicar</Link>
        </Button>
      </div>

      {/* Client component decides which posts API to call */}
      <ClientPostLoader userId={user?.id ?? null} />
    </main>
  );
}
