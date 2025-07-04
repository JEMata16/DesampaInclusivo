import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Desampa Inclusivo</h3>
            <p className="text-gray-300 mb-4">Conectando a personas en Costa Rica</p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="https://www.facebook.com/DesampaInclusivo" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.281 5.3.16 12 .16c3.17 0 6.167 1.233 8.413 3.477A11.822 11.822 0 0 1 23.84 12c0 6.627-5.373 12-12 12a11.87 11.87 0 0 1-5.945-1.587L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.346 1.591 5.448 0 9.877-4.429 9.877-9.877 0-2.64-1.03-5.122-2.899-6.991A9.825 9.825 0 0 0 12 2.16c-5.448 0-9.877 4.429-9.877 9.877 0 2.07.596 3.67 1.591 5.346l-.995 3.637 3.637-.995zm11.387-5.464c-.197-.098-1.17-.578-1.352-.644-.181-.067-.314-.098-.447.098-.133.197-.513.644-.63.777-.116.133-.233.15-.43.05-.197-.098-.832-.307-1.586-.98-.587-.522-.98-1.165-1.096-1.362-.116-.197-.012-.304.086-.401.089-.088.197-.23.296-.345.099-.115.132-.197.198-.329.066-.132.033-.247-.016-.345-.049-.098-.447-1.077-.612-1.477-.161-.388-.326-.335-.447-.341-.115-.006-.247-.007-.38-.007-.132 0-.346.049-.527.246-.181.197-.693.677-.693 1.646 0 .969.709 1.905.808 2.039.099.132 1.397 2.136 3.393 2.91.475.164.844.262 1.133.335.476.121.91.104 1.253.063.382-.045 1.17-.478 1.336-.94.165-.462.165-.857.115-.94-.049-.082-.18-.132-.377-.23z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/desampainclusivo/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@desampainclusivo" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Accesos Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Inicio</Link></li>
              <li><Link href="/publicaciones" className="text-gray-300 hover:text-white">Experiencias</Link></li>
              <li><Link href="/videos" className="text-gray-300 hover:text-white">Vídeos</Link></li>
              <li><Link href="/capacitaciones" className="text-gray-300 hover:text-white">Capacitaciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li><Link href="#/recursos" className="text-gray-300 hover:text-white">Recursos</Link></li>
              <li><Link href="#/contacto" className="text-gray-300 hover:text-white">Contáctanos</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Centro de ayuda</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Política de privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Recuerda</h4>
            <p className="text-gray-300 mb-4">¡Mantente conectado con nosotros!</p>

          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} YaDanza! Derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}