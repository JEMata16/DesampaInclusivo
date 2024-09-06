import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

import HamburgerMenu from "./_components/HamburgerMenu";
import Image from "next/image";
import AuthOptionsButtons from "./_components/AuthOptions";

export const metadata = {
  title: "Desampa inclusivo",
  description: "Desamparados inclusivo",
  icons: [{ rel: "icon", url: "/favicon.ico" }], // Cambiar icono de scaffolding después
};


function Header() {

  return (
    <header className="flex flex-row justify-between items-center">
      <HamburgerMenu />
      <Image src="/Logo ADI.png" alt="LOGO ADI" width={100} height={50} /> 
      <UserButton  appearance={{layout: {}}}/>
    </header>
  )
}

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
