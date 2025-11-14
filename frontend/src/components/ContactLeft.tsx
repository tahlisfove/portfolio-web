/* ce composant affiche la partie gauche de la page contact */

import React from "react";
import { useLanguage } from "../context/LanguageContext";

const ContactLeft: React.FC = () => {
  /* on recupere la fonction de traduction */
  const { t } = useLanguage();

  return (
    <div className="contact-left">

      {/* zone qui montre la disponibilite */}
      <div className="availability-contact">
        <span className="status-dot"></span>
        <span className="availability-text">{t("home.hero.availability")}</span>
      </div>

      {/* titre principal de la section */}
      <h1>{t("contact.contactTitle")}</h1>

      {/* petit texte introductif */}
      <p>{t("contact.contactText")}</p>

      {/* informations de contact */}
      <div className="contact-info">

        {/* email */}
        <div>
          <img src="/icons/logos/contact.png" alt="email" />
          <a className="contact-link" href="mailto:gdtsamuelchrist@gmail.com">
            gdtsamuelchrist@gmail.com
          </a>
        </div>

        {/* telephone */}
        <div>
          <img src="/icons/logos/phone.png" alt="phone" />
          <a className="contact-link" href="tel:+33780319267">
            (+33) 7 80 31 92 67
          </a>
        </div>

        {/* linkedin */}
        <div>
          <img src="/icons/logos/linkedin3.png" alt="linkedin" />
          <a className="contact-link" href="https://www.linkedin.com/in/samuelchristoph/" target="_blank" rel="noopener noreferrer">
            samuelchristoph
          </a>
        </div>
      </div>

      {/* telechargement du cv */}
      <div className="contact-cv">
        <a href="/ChristophSamuel_CV.pdf" download>
          {t("contact.cv")}
          <img src="/icons/logos/cv.png" alt="cv icon" />
        </a>
      </div>
    </div>
  );
};

export default ContactLeft;
