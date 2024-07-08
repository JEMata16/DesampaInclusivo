'use client';
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import AuthOptionsButtons from "./_components/AuthOptions";
import HamburgerMenu from "./_components/HamburgerMenu";



export default async function HomePage() {
  
  return (
    <>
    <HamburgerMenu/>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <SignedIn>
          <Link href="/test">Dashboard</Link>
          <SignOutButton/>
        </SignedIn>

        <SignedOut>
          <AuthOptionsButtons/>
        </SignedOut>
        
      </main>
    </>
  );
}

