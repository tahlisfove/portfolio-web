import React from "react";
import "./ProjectCard.css";

/* interface du composant */
interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  tags?: string[];
  highlight?: boolean;
}

/* composant d'affichage d'un projet */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
  imageUrl,
  tags,
  highlight,
}) => {
  return (
    <div className={`project-card ${highlight ? "highlight" : ""}`}>
      {/* image du projet */}
      {imageUrl && !highlight && (
        <img src={imageUrl} alt={title} className="project-image" />
      )}

      {/* titre et description */}
      <h3>{title}</h3>
      <p>{description}</p>

      {/* tags */}
      {tags && tags.length > 0 && (
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* bouton vers le code GitHub avec icône */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-btn ${highlight ? "highlight" : ""}`}
      >
        <img src="/icons/github.png" alt="GitHub" className="github-icon" />{" "}
        code
      </a>
    </div>
  );
};

export default ProjectCard;
