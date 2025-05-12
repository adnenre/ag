"use client"

import { createContext, useContext, type ReactNode } from "react"
import { type Language, useTranslation } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  changeLanguage: (language: Language) => void
  t: (key: string, section?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, changeLanguage, t } = useTranslation()

  return <LanguageContext.Provider value={{ language, changeLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
