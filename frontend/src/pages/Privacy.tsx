import React from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Privacy.css"

const Privacy: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div className="privacy-page">
      {/* titre de la page */}
      <h1 aria-label={t("privacy.title")}>{t("privacy.title")}</h1>

      {/* texte d’introduction */}
      <div className="privacy-section">
        <p>{t("privacy.intro")}</p>
      </div>

      {/* section : collecte des données */}
      <div className="privacy-section">
        <h2 aria-label={t("privacy.dataCollection")}>{t("privacy.dataCollection")}</h2>
        <p>{t("privacy.dataCollectionText")}</p>
      </div>

      {/* section : utilisation des données */}
      <div className="privacy-section">
        <h2 aria-label={t("privacy.useOfData")}>{t("privacy.useOfData")}</h2>
        <p>{t("privacy.useOfDataText")}</p>
      </div>

      {/* section : conservation des données */}
      <div className="privacy-section">
        <h2 aria-label={t("privacy.dataRetention")}>{t("privacy.dataRetention")}</h2>
        <p>{t("privacy.dataRetentionText")}</p>
      </div>

      {/* section : contact */}
      <div className="privacy-section">
        <h2 aria-label={t("privacy.contactInfos")}>{t("privacy.contactInfos")}</h2>
        <p>
          {t("privacy.contactTextStart")}
          <a href="mailto:gdtsamuelchrist@gmail.com" aria-label={t("privacy.contactEmail")}>
            gdtsamuelchrist@gmail.com
          </a>
          {t("privacy.contactTextMiddle")}
          <a
            href="https://www.linkedin.com/in/samuelchristoph/"
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
