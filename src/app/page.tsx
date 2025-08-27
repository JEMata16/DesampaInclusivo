'use client';
import Image from "next/image";
// import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
import AuthOptionsButtons from "../components/AuthOptions";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useUser } from "@clerk/nextjs";
import Resources from "~/components/Resources";



export default function HomePage() {
  const { isSignedIn } = useUser();

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
          <Image src="/Dance.png" layout="fill" objectFit="cover" alt="Imagen de bailarines" />
          {/* Your content here */}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block bg-primary-600 bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🌟 Únete o visualiza nuestras danzas locales
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Desampa Inclusivo
            <span className="block text-primary-300">comienza acá</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Conecta con bailarines pasionales, comparte tus experiencias y descubre espacios inclusivos. Acceso a recursos que apoyen a cada persona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        {!isSignedIn && (
          <button
            onClick={() => window.location.href = '/sign-in'}
            className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            🎭 Únete a nuestra comunidad
          </button>
        )}
            <a
              onClick={() => window.location.href = '/publicaciones'}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105"
            >
              ✨ Explora lugares accesibles
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-primary-200">Bailarines</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-primary-200">Historias compartidas</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
              <div className="text-primary-200">Capacitaciones</div>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Únete a nuestra creciente comunidad</h3>
            <div className="flex justify-center space-x-6">
              {/* Facebook */}
              <a href="https://www.facebook.com/DesampaInclusivo" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.281 5.3.16 12 .16c3.17 0 6.167 1.233 8.413 3.477A11.822 11.822 0 0 1 23.84 12c0 6.627-5.373 12-12 12a11.87 11.87 0 0 1-5.945-1.587L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.346 1.591 5.448 0 9.877-4.429 9.877-9.877 0-2.64-1.03-5.122-2.899-6.991A9.825 9.825 0 0 0 12 2.16c-5.448 0-9.877 4.429-9.877 9.877 0 2.07.596 3.67 1.591 5.346l-.995 3.637 3.637-.995zm11.387-5.464c-.197-.098-1.17-.578-1.352-.644-.181-.067-.314-.098-.447.098-.133.197-.513.644-.63.777-.116.133-.233.15-.43.05-.197-.098-.832-.307-1.586-.98-.587-.522-.98-1.165-1.096-1.362-.116-.197-.012-.304.086-.401.089-.088.197-.23.296-.345.099-.115.132-.197.198-.329.066-.132.033-.247-.016-.345-.049-.098-.447-1.077-.612-1.477-.161-.388-.326-.335-.447-.341-.115-.006-.247-.007-.38-.007-.132 0-.346.049-.527.246-.181.197-.693.677-.693 1.646 0 .969.709 1.905.808 2.039.099.132 1.397 2.136 3.393 2.91.475.164.844.262 1.133.335.476.121.91.104 1.253.063.382-.045 1.17-.478 1.336-.94.165-.462.165-.857.115-.94-.049-.082-.18-.132-.377-.23z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/desampainclusivo/" target="_blank" rel="noopener noreferrer"
                className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@desampainclusivo" target="_blank" rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 mt-4">Síguenos para inspiración diaria, consejos y novedades</p>
          </div>
        </div>
      </section>
      <Resources />
      <Footer />

    </>
  );
}

