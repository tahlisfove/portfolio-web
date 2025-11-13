/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

/* différentes langues */
type Language = "fr" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

/* dictionnaire des traductions */
const translations = { en, fr };

/* valeurs par défaut */
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

/* provider de langue */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /* langue actuelle */
  const [language, setLanguage] = useState<Language>("fr");

  /* fonction pour basculer entre fr et en */
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  /* fonction de traduction selon la langue */
  const t = (key: string): string => {
    const parts = key.split(".");
    let result: unknown = translations[language];
    for (const part of parts) {
      if (typeof result === "object" && result !== null && part in result) {
        result = (result as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof result === "string" ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* hook pour utiliser le contexte de langue */
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
