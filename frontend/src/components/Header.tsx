/* header */

import React, { useState, useEffect, useRef } from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Header.css"

interface HeaderProps {
  setPage: (page: "home" | "projects" | "contact") => void
  activePage: "home" | "projects" | "contact" | "privacy"
}

const Header: React.FC<HeaderProps> = ({ setPage, activePage }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  /* reference sur le conteneur header */
  const headerRef = useRef<HTMLDivElement>(null)

  /* changer de page et fermer le menu */
  const handleClick = (page: "home" | "projects" | "contact") => {
    setPage(page)
    setMenuOpen(false)
  }

  /* fermer le menu si clic en dehors */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-container" ref={headerRef}>
        {/* logo de la page */}
        <div
          className="header-logo"
          tabIndex={0}
          aria-label={language === "fr" ? "aller a l accueil" : "go to home"}
          onClick={() => handleClick("home")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick("home")
            }
          }}
        >
          <img src="/icons/projects/portfolio.png" alt="samuel christoph" />
        </div>

        {/* navigation principale */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button
            className={`nav-link ${activePage === "projects" ? "active" : ""}`}
            onClick={() => handleClick("projects")}
            aria-label={language === "fr" ? "aller a projets" : "go to projects"}
          >
            {t("nav.projects")}
          </button>

          <button
            className={`nav-link ${activePage === "home" ? "active" : ""}`}
            onClick={() => handleClick("home")}
            aria-label={language === "fr" ? "aller a accueil" : "go to home"}
          >
            {t("nav.home")}
          </button>

          <button
            className={`nav-link ${activePage === "contact" ? "active" : ""}`}
            onClick={() => handleClick("contact")}
            aria-label={language === "fr" ? "aller a contact" : "go to contact"}
          >
            {t("nav.contact")}
          </button>

          {/* switch langue */}
          <div
            className="lang-minimal"
            tabIndex={0}
            aria-label={language === "fr" ? "changer la langue" : "change language"}
            onClick={toggleLanguage}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleLanguage()
              }
            }}
          >
            <span
              className={language === "fr" ? "active" : ""}
              role="img"
              aria-label={language === "fr" ? "francais actif" : "french active"}
            >
              🇫🇷 FR
            </span>
            <span className="separator">|</span>
            <span
              className={language === "en" ? "active" : ""}
              role="img"
              aria-label={language === "fr" ? "anglais actif" : "english active"}
            >
              🇬🇧 EN
            </span>
          </div>
        </nav>

        {/* bouton menu mobile */}
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label={language === "fr" ? "ouvrir fermer menu" : "open close menu"}
          tabIndex={0}
          onClick={() => setMenuOpen(!menuOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setMenuOpen(!menuOpen)
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header
