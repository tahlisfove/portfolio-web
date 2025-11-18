/* éléments stack technologique */

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Stack.css";
import fr from "../i18n/fr.json";
import en from "../i18n/en.json";

const technologies = [
  "react",
  "typescript",
  "nodejs",
  "git",
  "figma",
  "android",
  "postgresql",
  "docker",
];

const Stack: React.FC = () => {
  const { language } = useLanguage();
  const [openTech, setOpenTech] = useState<string | null>(null);

  /* détection clic extérieur pour fermer le tooltip */
  useEffect(() => {
    const closeTooltip = () => setOpenTech(null);
    window.addEventListener("click", closeTooltip);
    return () => window.removeEventListener("click", closeTooltip);
  }, []);

  const dict = language === "fr" ? fr.home.stack : en.home.stack;

  return (
    <section
      className="stack"
      aria-label={
        language === "fr" ? "section stack technologique" : "tech stack section"
      }
      role="region"
    >
      <h2>{dict.sectionTitle}</h2>

      <div className="stack-grid">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="stack-item"
            role="img"
            aria-label={language === "fr" ? `logo de ${tech}` : `${tech} logo`}
            onClick={(e) => {
              e.stopPropagation();
              setOpenTech(openTech === tech ? null : tech);
            }}
          >
            <img src={`/icons/stack/${tech}.png`} alt={tech} />
            <span>{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>

            {/* tooltip descriptif au clic */}
            {openTech === tech && (
              <div className="stack-tooltip">
                {dict.descriptions[tech as keyof typeof dict.descriptions]}              
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
