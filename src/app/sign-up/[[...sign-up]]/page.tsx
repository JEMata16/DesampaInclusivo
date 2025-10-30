import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#273e47] to-[#15162c] text-white">
      <Image src="/Logo ADI.png" alt="LOGO ADI" width={200} height={200} />

      <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Crear cuenta</h1>

        <div className="mb-4">
          <SignUp />
        </div>

      </div>
    </main>
  );
}