/* page projet */

import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  translations?: {
    title_en?: string;
    description_en?: string;
  };
  link: string;
  imageUrl?: string;
  tags?: string[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolio-api-kpk6.onrender.com/api/projects")
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // animation d'apparition
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".project-card").forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) return null;

  const githubProjects = projects.filter(
    p => p.title !== "Plus de mes travaux sur GitHub"
  );
  const githubProfile = projects.find(
    p => p.title === "Plus de mes travaux sur GitHub"
  );

  return (
    <div className="projects-container" role="main" aria-label={t("projects.sectionAria")}>
      <div className="projects-intro" role="region" aria-label={t("projects.introAria")}>
        <h2>{t("projects.title")}</h2>
        <p>{t("projects.intro")}</p>

        {/* ligne séparatrice */}
        <div className="line-between-intro-projects" aria-hidden="true"></div>
      </div>

      {/* liste des projets */}
      {githubProjects
        .slice()
        .reverse()
        .map(proj => (
          <ProjectCard
            key={proj.id}
            title={
              language === "fr"
                ? proj.title
                : proj.translations?.title_en || proj.title
            }
            description={
              language === "fr"
                ? proj.description
                : proj.translations?.description_en || proj.description
            }
            link={proj.link}
            imageUrl={proj.imageUrl}
            tags={proj.tags}
          />
        ))}

      {/* bouton profil GitHub */}
      {githubProfile && (
        <div className="github-profile-card" role="region" aria-label={t("projects.githubBtnAria")}>
          <a
            href={githubProfile.link}
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
