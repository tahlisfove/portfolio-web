/* page politique de confidentialité */

import React from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Privacy.css"

const Privacy: React.FC = () => {
  const { t } = useLanguage()

  const EMAIL = import.meta.env.VITE_EMAIL;
  const LINKEDIN = import.meta.env.VITE_LINKEDIN;

  return (
    <div className="privacy-page">
      {/* titre de la page */}
      <h1 aria-label={t("privacy.title")}>{t("privacy.title")}</h1>

      {/* texte d’introduction */}
      <div className="privacy-section" role="region" aria-labelledby="privacy-intro-title">
        <p>{t("privacy.intro")}</p>
      </div>

      {/* section : collecte des données */}
      <div className="privacy-section" role="region" aria-labelledby="data-collection-title">
        <h2 id="data-collection-title">{t("privacy.dataCollection")}</h2>
        <p>{t("privacy.dataCollectionText")}</p>
      </div>

      {/* section : utilisation des données */}
      <div className="privacy-section" role="region" aria-labelledby="use-of-data-title">
        <h2 id="use-of-data-title">{t("privacy.useOfData")}</h2>
        <p>{t("privacy.useOfDataText")}</p>
      </div>

      {/* section : conservation des données */}
      <div className="privacy-section" role="region" aria-labelledby="data-retention-title">
        <h2 id="data-retention-title">{t("privacy.dataRetention")}</h2>
        <p>{t("privacy.dataRetentionText")}</p>
      </div>

      {/* section : contact */}
      <div className="privacy-section" role="region" aria-labelledby="contact-infos-title">
        <h2 id="contact-infos-title">{t("privacy.contactInfos")}</h2>
        <p>
          {t("privacy.contactTextStart")}
          <a href={`mailto:${EMAIL}`} aria-label={t("privacy.contactEmail")}>
            {EMAIL}
          </a>
          {t("privacy.contactTextMiddle")}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("privacy.contactLinkedin")}
          >
            LinkedIn
          </a>
          {t("privacy.contactTextEnd")}
        </p>
      </div>
    </div>
  )
}

export default Privacy
