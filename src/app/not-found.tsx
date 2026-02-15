import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-accent mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">Página no encontrada</h2>
        <p className="text-muted mb-10 max-w-md mx-auto font-light">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-accent hover:bg-accent-light text-white font-medium px-7 py-3 rounded-full transition-colors duration-200"
          >
            Ir al inicio
          </Link>
          <Link
            href="/propiedades"
            className="border border-border text-foreground hover:bg-surface-2 font-medium px-7 py-3 rounded-full transition-colors duration-200"
          >
            Ver propiedades
          </Link>
        </div>
      </div>
    </div>
  )
}
