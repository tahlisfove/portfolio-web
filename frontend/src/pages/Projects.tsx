/* page projet */

import React, { useEffect } from "react";
import { useProjects, type Project } from "../hooks/importProjects";
import { useLanguage } from "../context/LanguageContext";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import "../styles/Projects.css";

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const { projects, showLoader } = useProjects();

  /* animation d'apparition des projets */
  useEffect(() => {
    if (!projects.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".project-card").forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="projects-container" role="main" aria-label={t("projects.sectionAria")}>
      
      {/* introduction */}
      <div className="projects-intro" role="region" aria-label={t("projects.introAria")}>
        <h2>{t("projects.title")}</h2>
        <p>{t("projects.intro")}</p>

        {/* ligne séparatrice */}
        <div className="line-between-intro-projects" aria-hidden="true"></div>
      </div>

      {/* loader si aucun projet n'est encore chargé */}
      {projects.length === 0 && showLoader && (
        <Loader text={t("home.projects.loading")} />
      )}

      {/* liste des projets */}
      {projects
        .slice()
        .reverse()
        .map((proj: Project) => (
          <ProjectCard
            key={proj.id}
            title={language === "fr" ? proj.title : proj.translations?.title_en || proj.title}
            description={language === "fr" ? proj.description : proj.translations?.description_en || proj.description}
            link={proj.link}
            imageUrl={proj.imageUrl}
            tags={proj.tags}
          />
        ))}

      {/* bouton profil GitHub */}
      {projects.length > 0 && (
        <div className="github-profile-card" role="region" aria-label={t("projects.btnGithub")}>
          <a
            href="https://github.com/tahlisfove"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github-profile"
          >
            {t("projects.btnGithub")}
          </a>
        </div>
      )}
    </div>
  );
};

export default Projects;
