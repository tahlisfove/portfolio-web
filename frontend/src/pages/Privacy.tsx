import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Privacy.css";

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="privacy-page">
      {/* titre de la page */}
      <h1>{t("privacy.title")}</h1>

      {/* texte d’introduction */}
      <div className="privacy-section">
        <p>{t("privacy.intro")}</p>
      </div>

      {/* section : collecte des données */}
      <div className="privacy-section">
        <h2>{t("privacy.dataCollection")}</h2>
        <p>{t("privacy.dataCollectionText")}</p>
      </div>

      {/* section : utilisation des données */}
      <div className="privacy-section">
        <h2>{t("privacy.useOfData")}</h2>
        <p>{t("privacy.useOfDataText")}</p>
      </div>

      {/* section : conservation des données */}
      <div className="privacy-section">
        <h2>{t("privacy.dataRetention")}</h2>
        <p>{t("privacy.dataRetentionText")}</p>
      </div>

      {/* section : contact */}
      <div className="privacy-section">
        <h2>{t("privacy.contactInfos")}</h2>
        <p>
          {t("privacy.contactTextStart")}
          <a href="mailto:gdtsamuelchrist@gmail.com">
            gdtsamuelchrist@gmail.com
          </a>
          {t("privacy.contactTextMiddle")}
          <a href="https://www.linkedin.com/in/samuelchristoph/" target="_blank" rel="noopener noreferrer" >
            LinkedIn
          </a>
          {t("privacy.contactTextEnd")}
        </p>
      </div>
    </div>
  );
};

export default Privacy;
