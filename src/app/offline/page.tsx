"use client"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <svg className="w-20 h-20 text-muted mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M12 9v4m0 4h.01" />
      </svg>
      <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Sin conexión</h1>
      <p className="text-muted text-lg mb-6 max-w-md">
        No tienes conexión a internet. Verifica tu conexión e intenta nuevamente.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-light transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}
