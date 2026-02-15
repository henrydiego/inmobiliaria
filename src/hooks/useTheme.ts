"use client"

import { useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored) {
      setThemeState(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setThemeState(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
    document.documentElement.classList.toggle("dark", t === "dark")
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return { theme, setTheme, toggle, mounted }
}
