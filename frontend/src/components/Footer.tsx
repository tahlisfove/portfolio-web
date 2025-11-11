import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

interface FooterProps {
  setPage: (page: "home" | "projects" | "contact") => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const { t } = useLanguage();

  // fonction pour naviguer vers la page contact
  const goToContact = () => {
    setPage("contact");
  };

  return (
    // footer principal contenant logos et texte
    <footer className="footer">
      {/* section logos : linkedin, github, bouton email */}
      <div className="footer-logos">
        <a
          href="https://www.linkedin.com/in/samuelchristoph/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/linkedin.png" alt="LinkedIn" />
        </a>
        <a
          href="https://github.com/tahlisfove"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/github.png" alt="GitHub" />
        </a>
        <button className="email-button" onClick={goToContact}>
          <img src="/icons/email.png" alt="Contact" />
        </button>
      </div>

      {/* section texte : copyright */}
      <div className="footer-text">
        <p>{t("footer")}</p>
      </div>
    </footer>
  );
};

export default Footer;
