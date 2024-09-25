"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import HamburgerMenu from "./HamburgerMenu";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <header className="flex flex-row justify-between items-center">
      <HamburgerMenu />
      <Image src="/Logo ADI.png" alt="LOGO ADI" width={100} height={50} />
      <UserButton />
    </header>
  );
}
