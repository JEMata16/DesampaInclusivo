'use client';
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import AuthOptionsButtons from "./_components/AuthOptions";



export default function HomePage() {
  
  return (
    <>
      {/* <TopNav/> */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
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

