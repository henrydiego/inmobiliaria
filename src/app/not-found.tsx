import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary-light mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-dark mb-3">Página no encontrada</h2>
        <p className="text-gray-medium mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-primary-light hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/propiedades"
            className="border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Ver propiedades
          </Link>
        </div>
      </div>
    </div>
  )
}
