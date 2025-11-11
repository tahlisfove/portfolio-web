/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";

/* types de langues disponibles */
type Language = "fr" | "en";

/* structure du contexte de langue */
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

/* création du contexte avec des valeurs par défaut */
const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  toggleLanguage: () => {},
  t: (key: string) => key,
});

/* traductions */
const translations = {
  fr: {
    home: "Accueil",
    projects: "Projets",
    contact: "Contact",
    footer: "© 2025 Samuel Christoph. Réalisé avec React.",
    fieldsRequired: "Veuillez remplir tous les champs obligatoires.",
    invalidEmail: "Veuillez saisir un email valide.",
    sendSuccess: "Message envoyé avec succès !",
    sendError: "Erreur lors de l'envoi. Veuillez réessayer plus tard.",
    "Nom *": "Nom *",
    "Email *": "Email *",
    "Sujet *": "Sujet *",
    "Message *": "Message *",
    "Envoyer": "Envoyer",
  },
  en: {
    home: "Home",
    projects: "Work",
    contact: "Contact",
    footer: "© 2025 Samuel Christoph. Built with React.",
    fieldsRequired: "Please fill in all required fields.",
    invalidEmail: "Please enter a valid email address.",
    sendSuccess: "Message sent successfully!",
    sendError: "Error sending message. Please try again later.",
    "Nom *": "Name *",
    "Email *": "Email *",
    "Sujet *": "Subject *",
    "Message *": "Message *",
    "Envoyer": "Send",
  },
};

/* fournisseur du contexte de langue */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("fr");

  /* bascule entre français et anglais */
  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  /* fonction de traduction */
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["fr"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* hook pour accéder au contexte */
export const useLanguage = () => useContext(LanguageContext);
