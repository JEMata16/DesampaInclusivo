import { ClerkLoaded, ClerkLoading, Protect } from "@clerk/nextjs";
import Link from "next/link";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";

export default function videosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="block min-h-screen bg-gray-200">
      <Protect
        condition={(has) =>
          has({ role: "org:muni" }) || has({ role: "org:admin" })
        }
      >
        <Button variant="upload" size={"sm"} className="m-3 p-3">
          <Link href="/videos/agregar">+ Agregar video</Link>
        </Button>
      </Protect>
      
      <ClerkLoading>
        <Loading />
      </ClerkLoading>

      <ClerkLoaded>{children}</ClerkLoaded>
    </main>
  );
}
