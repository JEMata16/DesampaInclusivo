import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import {
  ClerkProvider,
} from '@clerk/nextjs'
;

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
