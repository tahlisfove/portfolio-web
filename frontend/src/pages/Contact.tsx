/* page de contact */

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Contact.css";
import "../styles/Buttons.css";

import ContactLeft from "../components/ContactLeft";
import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="contact-page">
      {/* colonne gauche */}
      <ContactLeft />

      {/* ligne séparatrice */}
      {isMobile && (
        <div className="line-between-intro-projects" aria-hidden="true"></div>
      )}

      {/* colonne droite */}
      <div className="contact-right">
        {isMobile && <h2 className="contact-form-title">{t("contact.formTitle")}</h2>}
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
