import Link from 'next/link';
import { useState } from 'react';


export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 text-white focus:outline-none"
                onClick={toggleMenu}
            >
                {isOpen ? "Close" : "Open"}  {/* Cambiar por iconos*/}
            </button>
            <div
                className={`fixed inset-y-0 left-0 z-50 bg-gray-900 w-64 overflow-y-auto transform transition duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-lg font-bold text-white">Menu</span>
                    <button className="text-white focus:outline-none" onClick={toggleMenu}>
                        Close
                    </button>
                </div>
                <nav className="mt-4">
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Inicio</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Opiniones</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Ya! Danza</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Capacitaciones</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Información</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Contacto</Link>
                    <Link href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-800">Privacidad</Link>
                </nav>
            </div>
        </>
    );
}
