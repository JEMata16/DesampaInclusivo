'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()
  const pathname = usePathname();

  

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserDropdownOpen(false);
    // Here you would also handle Google sign-out if needed
  };

  const navLinks = [
    { href: '/', text: 'Inicio' },
    { href: '/publicaciones', text: 'Experiencias' },
    { href: '/videos', text: 'Vídeos' },
    { href: '/capacitaciones', text: 'Capacitaciones' },
    { href: '/#resources', text: 'Recursos' },
    { href: '/#contacto', text: 'Contacto' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600" onClick={() => window.location.href = '/'}>Desampa Inclusivo</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isSignedIn ? (
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.location.href = '/sign-in'}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar sesión
                </button>
                <button 
                  onClick={() => window.location.href = '/sign-up'}
                  className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* <button 
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">
                      {currentUser.given_name?.charAt(0) || currentUser.name?.charAt(0)}
                    </span>
                  </div>
                  <span>{currentUser.given_name || currentUser.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button> */}
                <UserButton 
                />
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuraciones</Link>
                      <hr className="my-1" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button 
              id="mobile-menu-btn" 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" 
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Hamburger icon */}
              <svg 
                className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg 
                className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white border-t border-gray-200">
          {/* Navigation Links */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  {link.text}
                </div>
              </Link>
            ))}
          </div>
          {/* Mobile Auth Buttons */}
          <div className="px-2 pt-2 pb-4 border-t border-gray-200">
            <div className="space-y-2">
              {!isSignedIn ? (
                <>
                  <button 
                    onClick={() => {
                      window.location.href = '/sign-in';
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Iniciar sesión
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = '/sign-up'
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Registrarse
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}