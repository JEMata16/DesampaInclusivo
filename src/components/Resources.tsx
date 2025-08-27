export default function Resources() {
  return (
    <section id="recursos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos e Información
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos esenciales para bailarines, incluyendo apoyo a la
            discapacidad e información legal
          </p>
        </div>

        {/* Categorías de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recursos para Discapacidad */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900">
                  Recursos de Apoyo a la Discapacidad
                </h3>
                <p className="text-blue-700">
                  Guías completas e información de apoyo
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  🏥 Obtención de Certificados de Discapacidad
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  Guía paso a paso para obtener el certificado oficial de
                  discapacidad para programas de danza y beneficios.
                </p>
                <ul className="text-sm text-blue-700 space-y-1 ml-4">
                  <li>• Documentación médica requerida</li>
                  <li>• Proceso de aplicación y tiempos</li>
                  <li>• Criterios y requisitos de elegibilidad</li>
                  <li>• Servicios de apoyo disponibles</li>
                </ul>
                <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Saber más →
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  ♿ Programas de Danza Accesible
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  Encuentra programas de danza diseñados para personas con
                  discapacidades y necesidades especiales.
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver Programas →
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  🤝 Organizaciones de Apoyo
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  Conéctate con organizaciones que apoyan a bailarines con
                  discapacidad.
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Buscar Apoyo →
                </button>
              </div>
            </div>
          </div>

          {/* Recursos Legales y Sociales */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900">
                  Apoyo Legal y Social
                </h3>
                <p className="text-green-700">
                  Derechos, beneficios e información legal
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  ⚖️ Derechos y Protección del Bailarín
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Conoce tus derechos como bailarín y la protección contra la
                  discriminación.
                </p>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Leer Guía →
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  💰 Programas de Asistencia Financiera
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Información sobre becas, ayudas económicas y subsidios para
                  bailarines.
                </p>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Explorar Opciones →
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  📞 Contactos de Emergencia
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Información de contacto importante para asistencia inmediata y
                  servicios de apoyo.
                </p>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Ver Contactos →
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  📋 Formularios y Documentos
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Descarga formularios y plantillas de documentación
                  importantes.
                </p>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Descargar Formularios →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

