import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

interface FooterProps {
  /* fonction qui change la page active */
  setPage: (page: "home" | "projects" | "contact" | "privacy") => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  /* texte traduit selon la langue */
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-logos">
        {/* lien linkedin */}
        <a href="https://www.linkedin.com/in/samuelchristoph/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/linkedin.png" alt="LinkedIn" />
        </a>

        {/* lien github */}
        <a href="https://github.com/tahlisfove" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.png" alt="GitHub" />
        </a>

        {/* ouvre la page contact */}
        <button className="email-button" onClick={() => setPage("contact")}>
          <img src="/icons/email.png" alt="Contact" />
        </button>
      </div>

      <div className="footer-text">
        <p>
          {t("footer.text")}{" "}
          {/* ouvre la page privacy */}
          <button className="privacy-link" onClick={() => setPage("privacy")}>
            {t("footer.privacy")}
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
