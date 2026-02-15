"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const prev = useCallback(() => {
    setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))
  }, [images.length])

  useEffect(() => {
    if (!fullscreen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight") next()
      else if (e.key === "Escape") setFullscreen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [fullscreen, prev, next])

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [fullscreen])

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX
  }

  function handleTouchEnd() {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-surface-2 rounded-2xl flex items-center justify-center">
        <span className="text-muted-2">Sin imágenes</span>
      </div>
    )
  }

  const navButtons = images.length > 1 && (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-surface/70 backdrop-blur-md hover:bg-surface/90 text-foreground p-2 rounded-full transition-all duration-200 border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface/70 backdrop-blur-md hover:bg-surface/90 text-foreground p-2 rounded-full transition-all duration-200 border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  )

  return (
    <>
      <div>
        {/* Main image */}
        <div
          className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-3 cursor-pointer"
          onClick={() => setFullscreen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[current]}
            alt={`${title} - Foto ${current + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority={current === 0}
          />
          {navButtons}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {images.length > 1 && (
              <span className="bg-surface/70 backdrop-blur-md text-foreground text-sm px-3 py-1 rounded-full border border-white/20">
                {current + 1} / {images.length}
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreen(true) }}
              className="bg-surface/70 backdrop-blur-md hover:bg-surface/90 text-foreground p-1.5 rounded-full transition-all duration-200 border border-white/20"
              aria-label="Pantalla completa"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  i === current ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2 bg-white/10 backdrop-blur-md rounded-full transition-colors duration-200"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <div className="absolute top-4 left-4 text-white/70 text-sm z-10 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
              {current + 1} / {images.length}
            </div>
          )}

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={images[current]}
              alt={`${title} - Foto ${current + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-[90vw] overflow-x-auto px-2 py-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    i === current ? "border-white" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
