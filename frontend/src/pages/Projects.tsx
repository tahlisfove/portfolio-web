import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import "./Projects.css";

/* structure d'un projet reçu depuis l'API */
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

/* page listant tous les projets */
const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  /* récupération des projets depuis le backend */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  /* animation d'apparition des cartes au scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));
  }, [projects]);

  if (loading) return <p className="loading">{t("projects.loading")}</p>;

  /* séparation entre les projets et profil GitHub */
  const githubProjects = projects.filter(
    (p) => p.title !== "Plus de mes travaux sur GitHub"
  );
  const githubProfile = projects.find(
    (p) => p.title === "Plus de mes travaux sur GitHub"
  );

  return (
    <div className="projects-container">
      {/* section d’introduction */}
      <div className="projects-intro">
        <h2>{t("projects.title")}</h2>
        <p>{t("projects.intro")}</p>
      </div>

      {/* affichage des projets */}
      {githubProjects
        .slice()
        .reverse()
        .map((proj) => (
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
            link={proj.link || "#"}
            imageUrl={proj.imageUrl}
            tags={proj.tags}
          />
        ))}

      {/* dernière carte pointant vers GitHub */}
      {githubProfile && (
        <div className="github-profile-card">
          <a
            href={githubProfile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn github-btn"
          >
            <img src="/icons/github.png" alt="GitHub" className="github-icon" />{" "}
            {t("projects.btnGithub")}
          </a>
        </div>
      )}
    </div>
  );
};

export default Projects;
