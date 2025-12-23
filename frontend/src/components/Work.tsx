/* expérience professionnelle */

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Work.css";
import fr from "../i18n/fr.json";
import en from "../i18n/en.json";

const Work: React.FC = () => {
  const { language } = useLanguage();
  const dict = language === "fr" ? fr.home.work : en.home.work;

  /* liste des expériences depuis le JSON */
  const experiences = Object.values(dict.experiences);

  /* si taille mobile */
  const isMobile = window.innerWidth <= 600;

  return (
    <section className="work" aria-label={dict.sectionAria} role="region">
      <h2>{dict.title}</h2>

      {experiences.map((experience, index) => (
        <article key={index} className="work-card">
          <header className="work-header">

            {/* header pancarte */}
            <div className="work-company-wrapper">
              
              {/* partie gauche : texte */}
              <div className="work-company-left">
                <h3>{experience.title}</h3>
                <p className="work-company">{experience.company} - {experience.location}</p>
                  <a className="work-site" href={experience.site} target="_blank" rel="noopener noreferrer">
                    {experience.siteLabel}
                  </a>
              </div>

              {/* partie droite : logos */}
              <div className="work-logos">
                <a href="https://www.cgi.com/france" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/work/cgi.webp" alt="Logo CGI" />
                </a>
                <a href="https://www.femmes-numerique.fr" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/work/femmes_numerique.webp" alt="Logo Femme@Numérique" />
                </a>
              </div>
            </div>
          </header>

          {/* points importants */}
          {isMobile ? (
          <p className="work-tasks-mobile">
              {experience.tasks.t1} {experience.tasks.t2} {experience.tasks.t3}
          </p>
          ) : (
          <ul className="work-tasks">
              <li>{experience.tasks.t1}</li>
              <li>{experience.tasks.t2}</li>
              <li>{experience.tasks.t3}</li>
          </ul>
          )}

          {/* feedback expérience */}
          <p className="work-feedback">{experience.feedback}</p>
        </article>
      ))}
    </section>
  );
};

export default Work;
