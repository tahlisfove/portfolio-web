/* carte d'un projet */

import React from "react";
import "../styles/ProjectCard.css";
import "../styles/Buttons.css";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  tags?: string[];
  highlight?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
  imageUrl,
  tags,
  highlight,
}) => {
  return (
    /* carte d'un projet */
    <article
      className={`project-card ${highlight ? "highlight" : ""}`}
      aria-labelledby={`project-title-${title}`}
      aria-describedby={`project-desc-${title}`}
      role="article"
    >

      {/* header avec logo et titre */}
      <header className="project-header">
        {imageUrl && (
          <img src={imageUrl} alt={`logo du projet ${title}`} className="project-logo" loading="lazy"/>
        )}
        <h3 id={`project-title-${title}`}>{title}</h3>
      </header>

      {/* stack et tags */}
      {tags && tags.length > 0 && (
        <div
          className="project-tags"
          role="list"
          aria-label="technologies utilisées / used technologies"
        >
          {tags.map((tag, idx) => (
            <span key={idx} className="tag" role="listitem">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* description */}
      <p id={`project-desc-${title}`}>
        {description}
      </p>

      {/* bouton code accessible */}
      <div className="project-footer">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-project-code"
          aria-label={`voir le code du projet ${title} / view the code of project ${title}`}
          role="button"
        >
          <img src="/icons/logos/github.webp" alt="" aria-hidden="true" className="github-icon-btn"/>
          CODE
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
