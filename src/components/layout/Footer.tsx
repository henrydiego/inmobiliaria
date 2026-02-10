import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-primary-light">21</span> Inmobiliaria
            </h3>
            <p className="text-sm leading-relaxed">
              Tu socio de confianza en bienes raíces. Encontramos la propiedad perfecta para ti en Cochabamba.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="hover:text-white transition-colors">Propiedades</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>Av. América #123, Cochabamba</li>
              <li>Tel: +591 4 4123456</li>
              <li>WhatsApp: +591 70012345</li>
              <li>info@inmobiliaria21.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Inmobiliaria 21. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
