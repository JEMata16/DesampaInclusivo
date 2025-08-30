import { Link as LinkIcon, File, ArrowDownToLine, Phone, Mail, MessageCircle } from "lucide-react";
export default function Resources() {
  return (
    <section id="recursos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Recursos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos esenciales, incluyendo apoyo legal, contactos de emergencia y datos de certificación.
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
                  Recursos de Apoyo
                </h3>
                <p className="text-blue-700">
                  Guías completas e información de apoyo
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  ♿ Sobre la Certificación de Discapacidad
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  Recopilación de recursos sobre la certificación de discapacidad en Costa Rica
                </p>
                <ul className="text-sm text-black space-y-1 ml-4">
                  <li><a
                    href="/SOLICITUD-DE-CERTIFICACION-DE-LA-DISCAPACIDAD-F-SECDIS-01-2024.docx"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-2 text-blue-700 hover:underline text-sm font-medium ml-2 text-left flex items-center text-base">
                      <ArrowDownToLine size={18} className="mr-1" />
                      Descargar Solicitud de Certificación de Discapacidad por primera vez →
                    </button>
                  </a></li>
                  <li><a
                    href="/SOLICITUD-DE-RENOVACION-DE-CERTIFICACION-DE-DISCAPACIDAD-F-SECDIS-02-2024.docx"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-2 text-blue-700 hover:underline text-sm font-medium ml-2 text-left flex items-center text-base">
                      <ArrowDownToLine size={18} className="mr-1" />
                      Descargar Solicitud de Renovación de Certificación de Discapacidad →
                    </button>
                  </a></li>
                  <li><a
                    href="/REPOSICION-DE-DOCUMENTACION-DE-CERTIFICACION-DE-DISCAPACIDAD.docx"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-2 text-blue-700 hover:underline text-sm font-medium ml-2 text-left flex items-center text-base">
                      <ArrowDownToLine size={18} className="mr-1" />
                      Descargar Solicitud de Reposición de Certificación de Discapacidad →
                    </button>
                  </a></li>
                  <h5 className="font-semibold text-blue-900 mb-2 mt-2"> Sobre el carnet de discapacidad </h5>
                  <li><a
                    href="https://www.facebook.com/cenareccr/videos/cómo-solicitar-el-carné-de-discapacidad-en-el-consejo-nacional-de-personas-con-d/587402603642515/?mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-3 text-blue-700 hover:underline text-sm font-medium text-left flex items-center text-base">
                      <LinkIcon size={18} className="mr-1" />
                      Información CONAPDIS (2024) sobre la obtención del carnet de discapacidad [Vídeo] →
                    </button>
                  </a></li>
                  <h5 className="font-semibold text-blue-900 mb-2 mt-2"> Formas de contacto con CONAPDIS </h5>
                  <li><a href="tel:+5064102-3030" className="text-blue-700 hover:underline flex items-center text-base text-sm"><Phone size={15} className="mr-1" />4102-3030</a></li>
                  <li><a href="tel:+5064102-3010" className="text-blue-700 hover:underline flex items-center text-base text-sm"><Phone size={15} className="mr-1" />4102-3010</a></li>
                  <li><a href="mailto:certificaciondiscapacidad@conapdis.go.cr" className="text-blue-700 hover:underline flex items-center text-base text-sm"><Mail size={15} className="mr-1" />certificaciondiscapacidad@conapdis.go.cr</a></li>
                </ul>

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
                  ¡Siempre tendrás apoyo! Estamos para ayudarte.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  📞 Contactos de Emergencia
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Información de contacto importantes para asistencia inmediata y
                  servicios de apoyo.
                </p>
                <ul>
                  <li><a href="tel:+506911" className="text-blue-500 hover:underline flex items-center text-base text-sm"><Phone size={15} className="mr-1" />911</a></li>
                  <h5 className="font-semibold text-green-900 mb-2 mt-2"> Prevención del suicidio </h5>
                  <p className="text-gray-800 text-sm mb-3">Aquí Estoy del Colegio de Profesionales en Psicología</p>
                  <p className="text-green-800 text-sm mb-3">
                    Horario de Lunes a Viernes de 2:00 p.m. a 10:00 p.m. Sábados de 9:00 a.m. a 4:00 p.m.
                  </p>
                  <li><a href="tel:+506800-2737869" className="text-blue-500 hover:underline flex items-center text-base text-sm"><Phone size={15} className="mr-1" />800-2737869</a></li>
                  <li><a href="https://aquiestoy.chat" className="text-blue-500 hover:underline flex items-center text-base text-sm"><MessageCircle size={15} className="mr-1" />Aquí Estoy [Chat]</a></li>
                  <li>
                    <a href="https://wa.me/5491151993599" className="text-blue-500 hover:underline flex items-center text-base text-sm">
                      <svg className="mr-1" width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.89-.52-5.54-1.5l-.39-.23-4.27 1.38 1.4-4.16-.25-.4A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.27-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.68 4.02.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
                      </svg>
                      Aquí Estoy [WhatsApp]
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  ⚖️ Ley de Igualdad de Oportunidades para las Personas con Discapacidad
                </h4>
                <a
                    href="https://www.asamblea.go.cr/sd/SiteAssets/Lists/Consultas%20Biblioteca/EditForm/Ley%207600.pdf?web=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-2 text-blue-500 hover:underline text-sm font-medium ml-2 text-left flex items-center text-base">
                      <File size={18} className="mr-1" />
                      Visualizar Ley 7600 [Asamblea Legislativa] →
                    </button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

