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
  const [flippedTech, setFlippedTech] = useState<string | null>(null);
  const dict = language === "fr" ? fr.home.stack : en.home.stack;

  /* détection clic extérieur pour fermer le flip */
  useEffect(() => {
    const closeFlip = () => setFlippedTech(null);
    window.addEventListener("click", closeFlip);
    return () => window.removeEventListener("click", closeFlip);
  }, []);

  return (
    <section className="stack" aria-label={dict.sectionAria} role="region">
      <h2>{dict.sectionTitle}</h2>

      <div className="stack-grid">
        {technologies.map((tech) => (
          <div
            key={tech}
            className={`stack-item ${
              flippedTech === tech ? "flipped" : ""
            }`}
            role="img"
            aria-label={
              language === "fr" ? `logo de ${tech}` : `${tech} logo`
            }
            onClick={(e) => {
              e.stopPropagation();
              setFlippedTech(flippedTech === tech ? null : tech);
            }}
          >
            {/* recto */}
            <div className="stack-item-front">
              <img src={`/icons/stack/${tech}.webp`} alt={tech} />
              <span>{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
            </div>

            {/* verso */}
            <div className="stack-item-back">
              <img src={`/icons/stack/${tech}.webp`} alt={tech} />
              <span className="description-stack">
                {dict.descriptions[tech as keyof typeof dict.descriptions]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
