/* informations de contact */

import React from "react"
import { useLanguage } from "../context/LanguageContext"

const ContactLeft: React.FC = () => {
  const { t, language } = useLanguage()

  /* récupération des variables d’environnement */
  const EMAIL = import.meta.env.VITE_EMAIL
  const PHONE = import.meta.env.VITE_PHONE
  const LINKEDIN = import.meta.env.VITE_LINKEDIN
  const CV_FR = import.meta.env.VITE_CV_FR
  const CV_EN = import.meta.env.VITE_CV_EN
  const LINKEDIN_NAME = import.meta.env.VITE_LINKEDIN_NAME

  /* sélection du CV selon la langue */
  const cvFile = language === "fr" ? CV_FR : CV_EN

  return (
    <div className="contact-left" role="region" aria-labelledby="contact-title">
      {/* zone disponibilite */}
      <div className="availability-contact" aria-label={t("home.hero.availability")} tabIndex={0}>
        <span className="status-dot"></span>
        <span className="availability-text">{t("home.hero.availability")}</span>
      </div>

      <h1 id="contact-title">{t("contact.contactTitle")}</h1>
      <p>{t("contact.contactText")}</p>

      <div className="contact-info">
        {/* email */}
        <div>
          <img src="/icons/logos/contact.png" alt={language === "fr" ? "email" : "email"} />
          <a
            className="contact-link"
            href={`mailto:${EMAIL}`}
            aria-label={language === "fr" ? `envoyer un email à Samuel` : "send email to Samuel"}
          >
            {EMAIL}
          </a>
        </div>

        {/* telephone */}
        <div>
          <img src="/icons/logos/phone.png" alt={language === "fr" ? "telephone" : "phone"} />
          <a
            className="contact-link"
            href={`tel:${PHONE?.replace(/\D/g, "")}`}
            aria-label={language === "fr" ? "appeler Samuel" : "call Samuel"}
          >
            {PHONE}
          </a>
        </div>

        {/* linkedin */}
        <div>
          <img src="/icons/logos/linkedin3.png" alt={language === "fr" ? "linkedin" : "linkedin"} />
          <a
            className="contact-link"
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={language === "fr" ? "profil linkedin de Samuel" : "Samuel's linkedin profile"}
          >
            {LINKEDIN_NAME}
          </a>
        </div>
      </div>

      {/* telechargement du cv */}
      <div className="contact-cv">
        <a href={cvFile} download
          aria-label={
            language === "fr"
              ? "telecharger le CV de Samuel"
              : "download Samuel's CV"
          }
        >
          {t("contact.cv")}
          <img src="/icons/logos/cv.png" alt={language === "fr" ? "icone cv" : "cv icon"} />
        </a>
      </div>
    </div>
  )
}

export default ContactLeft
