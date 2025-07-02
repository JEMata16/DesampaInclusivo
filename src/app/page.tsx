'use client';
import Image from "next/image";
// import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
import AuthOptionsButtons from "../components/AuthOptions";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";



export default function HomePage() {

  return (
    <>
      {/* <TopNav/> */}
      {/* <SignedIn>
          <Link href="/test">Dashboard</Link>
          <SignOutButton/>
        </SignedIn> 
        <SignedOut>
          <AuthOptionsButtons/>
        </SignedOut> */}


      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center text-white relative overflow-hidden">
        <div style={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
        }}>
          <Image src="/Dance.png" layout="fill" objectFit="cover" alt="Imagen de bailarines"/>
          {/* Your content here */}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block bg-primary-600 bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🌟 Unete o visita nuestras danzas locales
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Desampa Inclusivo
            <span className="block text-primary-300">Comienza acá</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Conecta con danzantes pasionales, comparte tus experiencias y descubre oportunidades de entrenamiento inclusivas. Acceso a recursos que apoyen a cada persona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.location.href = '/sign-in'}
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              🎭 Unete a nuestra comunidad
            </button>
            <a
              href="#experiences"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105"
            >
              ✨ Explora lugares accesibles
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-primary-200">Danzantes</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-primary-200">Historias compartidas</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-primary-200">Capacitaciones Gratuitas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials Section */}
      <section className="bg-gradient-to-r from-primary-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros vecinos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experiencias en lugares accesibles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Testimonio 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Gracias a esta plataforma, ahora puedo acceder a servicios públicos sin depender de otras personas. La accesibilidad digital ha hecho una gran diferencia en mi vida."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">M</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">María Rodríguez</div>
                  <div className="text-gray-500 text-sm">Usuaria con discapacidad visual</div>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Como madre de un joven con discapacidad, me siento acompañada. Aquí encontré información clara y accesible sobre programas del gobierno y derechos."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">E</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Elena Castro</div>
                  <div className="text-gray-500 text-sm">Madre cuidadora</div>
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Como costarricense con movilidad reducida, por fin encontré un sitio donde puedo expresar mis ideas, participar y sentirme parte de una comunidad."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Carlos Jiménez</div>
                  <div className="text-gray-500 text-sm">Activista por la inclusión</div>
                </div>
              </div>
            </div>
          </div>


          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Unete a nuestra creciente comunidad</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.219-.438-.219-1.085c0-1.016.589-1.775 1.322-1.775.623 0 .925.466.925 1.026 0 .625-.397 1.560-.603 2.426-.171.724.363 1.315 1.077 1.315 1.294 0 2.163-1.677 2.163-3.653 0-1.515-.896-2.651-2.518-2.651-1.833 0-2.896 1.353-2.896 2.693 0 .491.225.848.578 1.116.065.075.073.141.055.218-.061.248-.196.796-.223.907-.035.146-.116.177-.268.107-1.008-.466-1.377-1.719-1.377-3.111 0-2.27 1.894-4.990 5.637-4.990 3.040 0 5.055 2.174 5.055 4.498 0 3.095-1.718 5.439-4.246 5.439-.854 0-1.660-.466-1.934-1.019l-.545 2.117c-.181.694-.666 1.554-1.037 2.121.932.289 1.931.444 2.96.444 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z" />
                </svg>
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 mt-4">Siguenos para inspiración diaria, consejos y novedades</p>
          </div>
        </div>
      </section>
      <Footer />

    </>
  );
}

