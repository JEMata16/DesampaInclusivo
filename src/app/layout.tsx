
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import Header from "../components/Header";

export const metadata = {
  title: "Desampa inclusivo",
  description: "Desamparados inclusivo",
  icons: [{ rel: "icon", url: "/favicon.ico" }], // Cambiar icono de scaffolding después
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
