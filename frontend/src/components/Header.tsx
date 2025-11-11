import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Header.css";

interface HeaderProps {
  setPage: (page: "home" | "projects" | "contact") => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  // etat pour l'onglet actif et le menu
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // changer de page et mettre à jour le menu actif
  const handleClick = (page: "home" | "projects" | "contact") => {
    setActive(page);
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      {/* container pour centrer nav et boutons */}
      <div className="header-container">
        {/* barre de navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button
            className={`nav-link ${active === "projects" ? "active" : ""}`}
            onClick={() => handleClick("projects")}
          >
            {t("projects")}
          </button>

          <button
            className={`nav-link home-link ${active === "home" ? "active" : ""}`}
            onClick={() => handleClick("home")}
          >
            {t("home")}
          </button>

          <button
            className={`nav-link ${active === "contact" ? "active" : ""}`}
            onClick={() => handleClick("contact")}
          >
            {t("contact")}
          </button>
        </nav>

        {/* sélecteur de langue */}
        <div className="lang-switch" onClick={toggleLanguage}>
          {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
        </div>

        {/* menu pour mobile */}
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
