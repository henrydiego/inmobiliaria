export default function PropiedadesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="h-10 w-64 bg-surface-2 rounded-xl animate-pulse" />
        <div className="h-5 w-48 bg-surface-2 rounded-lg animate-pulse mt-3" />
      </div>
      <div className="bg-surface border border-border rounded-2xl p-5 mb-8 h-32 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="h-52 bg-surface-2 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 bg-surface-2 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-surface-2 rounded-lg animate-pulse" />
              <div className="h-6 w-1/3 bg-surface-2 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
