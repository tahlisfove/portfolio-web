/* éléments stack technologique */

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Stack.css";

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

  return (
    <section
      className="stack"
      aria-label={
        language === "fr" ? "section stack technologique" : "tech stack section"
      }
      role="region"
    >
      <h2>
        {language === "fr" ? "Stack technologique" : "Tech Stack"}
      </h2>

      <div className="stack-grid">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="stack-item"
            role="img"
            aria-label={language === "fr" ? `logo de ${tech}` : `${tech} logo`}
          >
            <img src={`/icons/stack/${tech}.png`} alt={tech} />
            <span>{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
