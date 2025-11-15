/* ce composant contient tout les informations de contact */

import React from "react"
import { useLanguage } from "../context/LanguageContext"

const ContactLeft: React.FC = () => {
  const { t, language } = useLanguage()

  return (
    <div className="contact-left">
      {/* zone disponibilite */}
      <div className="availability-contact" aria-label={t("home.hero.availability")}>
        <span className="status-dot"></span>
        <span className="availability-text">{t("home.hero.availability")}</span>
      </div>

      <h1>{t("contact.contactTitle")}</h1>
      <p>{t("contact.contactText")}</p>

      <div className="contact-info">
        {/* email */}
        <div>
          <img src="/icons/logos/contact.png" alt={language === "fr" ? "email" : "email"} />
          <a className="contact-link" href="mailto:gdtsamuelchrist@gmail.com" aria-label={language === "fr" ? "envoyer un email" : "send email"}>
            gdtsamuelchrist@gmail.com
          </a>
        </div>

        {/* telephone */}
        <div>
          <img src="/icons/logos/phone.png" alt={language === "fr" ? "telephone" : "phone"} />
          <a className="contact-link" href="tel:+33780319267" aria-label={language === "fr" ? "appeler" : "call"}>
            (+33) 7 80 31 92 67
          </a>
        </div>

        {/* linkedin */}
        <div>
          <img src="/icons/logos/linkedin3.png" alt={language === "fr" ? "linkedin" : "linkedin"} />
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/samuelchristoph/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={language === "fr" ? "linkedin profil" : "linkedin profile"}
          >
            samuelchristoph
          </a>
        </div>
      </div>

      {/* telechargement du cv */}
      <div className="contact-cv">
        <a href="/ChristophSamuel_CV.pdf" download aria-label={language === "fr" ? "telecharger cv" : "download cv"}>
          {t("contact.cv")}
          <img src="/icons/logos/cv.png" alt={language === "fr" ? "icone cv" : "cv icon"} />
        </a>
      </div>
    </div>
  )
}

export default ContactLeft
