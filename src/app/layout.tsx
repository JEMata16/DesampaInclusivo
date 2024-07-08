import "~/styles/globals.css";


import { GeistSans } from "geist/font/sans";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { useRef } from 'react-server-dom-webpack/server.edge';
import HamburgerMenu from "./_components/HamburgerMenu";

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
