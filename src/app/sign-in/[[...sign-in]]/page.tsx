'use client';
import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();
    if (!isLoaded) {
        return null;
    }
    const signInWithGoogle = () =>
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/'
        });
    return <button onClick={signInWithGoogle}>Login con Google</button>;
};

export default function SignInPage() {
    const { signIn, isLoaded } = useSignIn();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            await signIn.create({
                identifier,
                password,
            });
        } catch (err: any) {
            setError(err.errors ? err.errors[0].message : 'An error occurred');
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#273e47] to-[#15162c] text-white'>
            <Image src="/Logo ADI.png" alt="LOGO ADI" width={200} height={200} />

            <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Correo o Nombre de Usuario"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        className='block w-full px-4 py-3 rounded-lg bg-gray-200 border border-transparent focus:outline-none focus:bg-white focus:border-gray-500 text-black placeholder-gray-500'
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='block w-full px-4 py-3 rounded-lg bg-gray-200 border border-transparent focus:outline-none focus:bg-white focus:border-gray-500 text-black placeholder-gray-500'
                    />
                    <button type="submit" className="w-full bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg hover:opacity-90 transition duration-300">Login</button>
                </form>

                <div className="mt-4">
                    <SignInOAuthButtons />
                </div>
            </div>
        </main>

    );
}
