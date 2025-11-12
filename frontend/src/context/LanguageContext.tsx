/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";

/* différentes langues */
type Language = "fr" | "en";

/* contexte de langue */
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

/* valeurs par défaut */
const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  toggleLanguage: () => {},
  t: (key: string) => key,
});

/* dictionnaire des traductions */
const translations = {
  fr: {
    /* header */
    home: "Accueil",
    projects: "Projets",
    contact: "Contact",

    /* footer */
    footer: "© 2025 Samuel Christoph. Réalisé avec React.",

    /* contact page */
    contactIntro: "Vous avez un projet, une idée ou simplement envie d’échanger ? N’hésitez pas à me laisser un message via le formulaire ci-dessous. Je suis toujours intéressé par de nouveaux défis, collaborations ou opportunités professionnelles.",
    contactCV: "Télécharger mon CV",

    /* formulaire */
    contactFormTitle: "Formulaire de contact",
    "Nom *": "Nom *",
    "Email *": "Email *",
    "Sujet *": "Sujet *",
    "Message *": "Message *",
    "Envoyer": "Envoyer",
    fieldsRequired: "Veuillez remplir tous les champs obligatoires.",
    invalidEmail: "Veuillez saisir un email valide.",
    sendSuccess: "Message envoyé avec succès !",
    sendError: "Erreur lors de l'envoi. Veuillez réessayer plus tard.",
    contactMessageTooLong: "Le message ne peut pas dépasser 2000 caractères.",
  },
  en: {
    /* header */
    home: "Home",
    projects: "Work",
    contact: "Contact",

    /* footer */
    footer: "© 2025 Samuel Christoph. Built with React.",

    /* contact page */
    contactIntro: "Do you have a project, an idea, or simply want to chat? Feel free to leave me a message using the form below. I am always interested in new challenges, collaborations, or professional opportunities.",
    contactCV: "Download my Resume",

    /* formulaire */
    contactFormTitle: "Contact Form",
    "Nom *": "Name *",
    "Email *": "Email *",
    "Sujet *": "Subject *",
    "Message *": "Message *",
    "Envoyer": "Send",
    fieldsRequired: "Please fill in all required fields.",
    invalidEmail: "Please enter a valid email address.",
    sendSuccess: "Message sent successfully!",
    sendError: "Error sending message. Please try again later.",
    contactMessageTooLong: "Message cannot exceed 2000 characters.",
  },
};

/* provider de langue */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /* langue actuelle */
  const [language, setLanguage] = useState<Language>("fr");

  /* fonction pour basculer entre fr et en */
  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  /* fonction de traduction selon la langue */
  const t = (key: string) =>
    translations[language][key as keyof typeof translations["fr"]] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* hook pour utiliser le contexte de langue */
export const useLanguage = () => useContext(LanguageContext);
