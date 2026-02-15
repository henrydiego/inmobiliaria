"use client"

import { useState, useRef, useId } from "react"
import { uploadImage } from "@/lib/cloudinary"

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  label?: string
  maxImages?: number
}

export default function ImageUploader({ images, onChange, label = "Imágenes", maxImages }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (maxImages && images.length + files.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas.`)
      if (inputRef.current) inputRef.current.value = ""
      return
    }

    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const url = await uploadImage(file)
        urls.push(url)
      }
      onChange([...images, ...urls])
    } catch {
      alert("Error al subir imágenes. Verifica la configuración de Cloudinary.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
              <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="bg-white text-foreground p-1 rounded text-sm"
                  >
                    &#8592;
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="bg-danger text-white p-1 rounded text-sm"
                >
                  &#10005;
                </button>
                {i < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="bg-white text-foreground p-1 rounded text-sm"
                  >
                    &#8594;
                  </button>
                )}
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-accent text-white text-xs px-2 py-0.5 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent transition-colors ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {uploading ? "Subiendo..." : "Subir imágenes"}
        </label>
      </div>
    </div>
  )
}
