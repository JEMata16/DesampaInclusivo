'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import menuIcon from 'public/menu.png'

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (event.target && event.target instanceof Element && !event.target.closest('.nav')) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
            <button
                className="top-4 left-4 z-50 text-white focus:outline-none"
                onClick={toggleMenu}
            >
                <span><Image src={menuIcon} alt="Menu logo" height={25}/></span>
            </button>
            <div
                className={`fixed inset-y-0 left-0 z-50 bg-gray-100 w-64 overflow-y-auto transform transition duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-center px-4 py-3">
                    <Image src="/Logo ADI.png" alt="LOGO ADI" width={100} height={100} /> {/* Cambiar por logo con letras azules */}
                </div>
                <nav className="mt-4">
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Inicio</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Opiniones</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Ya! Danza</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Capacitaciones</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Información</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Contacto</Link>
                    <Link href="#" className="block py-2 px-4 text-base hover:bg-[#205c9c] hover:text-white">Privacidad</Link>
                </nav>
            </div>
        </>
    );
}
