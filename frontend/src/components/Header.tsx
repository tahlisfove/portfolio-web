import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Header.css";

interface HeaderProps {
  setPage: (page: "home" | "projects" | "contact") => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  /* gestion du clic sur un bouton de navigation */
  const handleClick = (page: "home" | "projects" | "contact") => {
    setActive(page);
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* logo cliquable pour retourner à l'accueil */}
        <div className="header-logo">
          <img
            src="/icons/logo_samuel.png"
            alt="Logo Samuel Christoph"
            onClick={() => handleClick("home")}
          />
        </div>

        {/* navigation principale */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button
            className={`nav-link ${active === "projects" ? "active" : ""}`}
            onClick={() => handleClick("projects")}
          >
            {t("nav.projects")}
          </button>

          <button
            className={`nav-link ${active === "home" ? "active" : ""}`}
            onClick={() => handleClick("home")}
          >
            {t("nav.home")}
          </button>

          <button
            className={`nav-link ${active === "contact" ? "active" : ""}`}
            onClick={() => handleClick("contact")}
          >
            {t("nav.contact")}
          </button>
        </nav>

        {/* bouton pour changer la langue */}
        <div className="lang-switch" onClick={toggleLanguage}>
          {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
        </div>

        {/* toggle du menu mobile */}
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
