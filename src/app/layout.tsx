
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import Header from "../components/Header";
import MyProvider from "~/utils/posts/layoutContext";


export const metadata = {
  title: "Desampa inclusivo",
  description: "Desamparados inclusivo",
  icons: [{ rel: "icon", url: "/favicon.ico" }], // Cambiar icono de scaffolding después
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClerkProvider>
          <Header />
          <MyProvider>
            {children}
          </MyProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
