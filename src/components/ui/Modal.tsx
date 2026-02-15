"use client"

import { useEffect, useRef, ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="bg-surface border border-border rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-divider">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-2 rounded-lg transition-colors duration-200 text-muted hover:text-foreground">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
