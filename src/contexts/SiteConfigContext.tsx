"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SiteConfig, DEFAULT_SITE_CONFIG } from "@/types"

interface SiteConfigContextType {
  config: SiteConfig
  loading: boolean
  saveConfig: (config: SiteConfig) => Promise<void>
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULT_SITE_CONFIG,
  loading: true,
  saveConfig: async () => {},
})

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoc(doc(db, "siteConfig", "main"))
      .then((snap) => {
        if (snap.exists()) {
          setConfig({ ...DEFAULT_SITE_CONFIG, ...snap.data() } as SiteConfig)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const saveConfig = useCallback(async (newConfig: SiteConfig) => {
    await setDoc(doc(db, "siteConfig", "main"), newConfig)
    setConfig(newConfig)
  }, [])

  return (
    <SiteConfigContext.Provider value={{ config, loading, saveConfig }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  return useContext(SiteConfigContext)
}
