/* footer */

import React from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Footer.css"

interface FooterProps {
  setPage: (page: "home" | "projects" | "contact" | "privacy") => void
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const { language, t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-logos">
        {/* lien linkedin */}
        <a
          href="https://www.linkedin.com/in/samuelchristoph/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={language === "fr" ? "linkedin profil" : "linkedin profile"}
        >
          <img src="/icons/logos/linkedin.png" alt="linkedin" />
        </a>

        {/* lien github */}
        <a
          href="https://github.com/tahlisfove"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={language === "fr" ? "github profil" : "github profile"}
        >
          <img src="/icons/logos/github.png" alt="github" />
        </a>

        {/* ouvre la page contact */}
        <button
          className="email-button"
          aria-label={language === "fr" ? "page de contact" : "contact page"}
          onClick={() => setPage("contact")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setPage("contact")
            }
          }}
        >
          <img src="/icons/logos/email.png" alt="contact" />
        </button>
      </div>

      <div className="footer-text">
        <p>
          {t("footer.text")}{" "}
          {/* ouvre la page privacy */}
          <button
            className="privacy-link"
            aria-label={language === "fr" ? "politique de confidentialite" : "privacy policy"}
            onClick={() => setPage("privacy")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setPage("privacy")
              }
            }}
          >
            {t("footer.privacy")}
          </button>
        </p>
        <p>{t("footer.right")}</p>
      </div>
    </footer>
  )
}

export default Footer
