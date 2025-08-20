"use client"

import { useState, useEffect } from "react"
import contentData from "@/locales/es/content.json"

type Language = "es"
type ContentData = typeof contentData

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("es")
  const [content, setContent] = useState<ContentData>(contentData)

  useEffect(() => {
    // Cargar idioma desde localStorage si existe
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es")) {
      setLanguage(savedLanguage)
      setContent(contentData)
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setContent(contentData)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: unknown = content

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  // Función para interpolar variables en las traducciones
  const tWithVars = (key: string, vars: Record<string, string | number>): string => {
    let translation = t(key)

    Object.entries(vars).forEach(([varKey, varValue]) => {
      translation = translation.replace(`{${varKey}}`, String(varValue))
    })

    return translation
  }

  return {
    language,
    changeLanguage,
    t,
    tWithVars,
    content,
  }
}
