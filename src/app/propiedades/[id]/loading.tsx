export default function PropertyDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-[400px] bg-surface-2 rounded-2xl animate-pulse mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-3/4 bg-surface-2 rounded-xl animate-pulse" />
          <div className="h-5 w-1/2 bg-surface-2 rounded-lg animate-pulse" />
          <div className="h-32 bg-surface-2 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-10 w-full bg-surface-2 rounded-xl animate-pulse" />
          <div className="h-64 bg-surface-2 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
