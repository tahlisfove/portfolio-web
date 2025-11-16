/* page home */

import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Home.css";
import "../styles/Buttons.css";

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

interface HomeProps {
  setPage: (page: "home" | "projects" | "contact") => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  /* backend db */
  const API_URL = "https://portfolio-api-kpk6.onrender.com";
  console.log("API_URL:", API_URL);

  /* récupération des projets depuis l'api */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("erreur récupération projets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [API_URL]);

  /* tri des projets pour affichage */
  const projectOrder = [
    projects.find(p => p.title === "Portfolio personnel interactif"),
    projects.find(p => p.title === "Application de gestion de tâches"),
    projects.find(p => p.title === "Site de Gestion de budget Partagé")
  ].filter(Boolean) as Project[];

  const yearLabels = [t("home.projects.years.ongoing"), "2025", "2024", "2023"];

  return (
    <div className="home-container">

      {/* section hero avec présentation */}
      <section className="hero" aria-label={t("home.hero.sectionAria")} role="region">
        <div className="hero-content">
          <div className="hero-photo" aria-label={t("home.hero.photoAria")}>
            <img src="/samuel.jpg" alt={t("home.hero.photoAlt")} className="photo-placeholder"/>
          </div>
          <h1>{t("home.hero.name")}</h1>
          <h2>{t("home.hero.status")}</h2>

          {/* disponibilité */}
          <div className="availability" aria-label={`${t("home.hero.availability")} : ${t("home.hero.status")}`}>
            <span className="status-dot"></span>
            <span className="availability-text">{t("home.hero.availability")}</span>
          </div>

          {/* réseaux sociaux */}
          <div className="contacts">
            <a href="https://instagram.com/samuel.chrstph" target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir Instagram dans un nouvel onglet" : "open Instagram in new tab"}>
              <img src="/icons/logos/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/samuelchristoph" target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir LinkedIn dans un nouvel onglet" : "open LinkedIn in new tab"}>
              <img src="/icons/logos/linkedin2.png" alt="LinkedIn" />
            </a>
            <a href="https://github.com/tahlisfove" target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir GitHub dans un nouvel onglet" : "open GitHub in new tab"}>
              <img src="/icons/logos/github.png" alt="GitHub" />
            </a>
            <a href="https://open.spotify.com/user/tahlisfove" target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir Spotify dans un nouvel onglet" : "open Spotify in new tab"}>
              <img src="/icons/logos/spotify.png" alt="Spotify" />
            </a>
          </div>

          {/* bouton contact */}
          <button className="btn-contact" onClick={() => setPage("contact")} aria-label={t("home.hero.contactBtn")}>
            {t("home.hero.contactBtn")}
            <img src="/icons/logos/contact.png" alt="Contact Icon" className="contact-icon" />
          </button>
        </div>
      </section>

      {/* section présentation */}
      <section className="about" aria-label={t("home.about.sectionAria")} role="region">
        <h2 id="about-title">{t("home.about.title")}</h2>
        <p>{t("home.about.p1")}</p>
        <p>{t("home.about.p2")}</p>
      </section>

      {/* section stack technologique */}
      <section className="stack" aria-label={t("home.stack.sectionAria")} role="region">
        <h2 id="stack-title">{t("home.stack.sectionTitle")}</h2>
        <div className="stack-grid">
          {[
            "react",
            "typescript",
            "nodejs",
            "git",
            "figma",
            "android",
            "postgresql",
            "docker"
          ].map(tech => (
            <div key={tech} className="stack-item" role="img"
                 aria-label={
                   language === "fr"
                     ? `logo de ${tech}`
                     : `${tech} logo`
                 }>
              <img src={`/icons/stack/${tech}.svg`} alt={tech} />
              <span>{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* section projets mis en avant */}
      <section className="featured-projects" aria-label={t("home.projects.sectionAria")} role="region">
        <h2 id="projects-title">{t("home.projects.sectionTitle")}</h2>
        {loading && <p className="loading">{t("home.projects.loading")}</p>}
        <div className="projects-line">
          {projectOrder.map((proj, index) => (
            <div key={proj.id} className="project-item" aria-label={`${language === "fr" ? proj.title : proj.translations?.title_en || proj.title}, ${yearLabels[index]}`}>
              <span className="project-title">{language === "fr" ? proj.title : proj.translations?.title_en || proj.title}</span>
              <div className="line-between"></div>
              <span className="project-year">{yearLabels[index]}</span>
            </div>
          ))}
        </div>
        <div className="btn-wrapper">
          <button className="btn-see-more" onClick={() => setPage("projects")} aria-label={t("home.projects.seeMoreBtn")}>
            {t("home.projects.seeMoreBtn")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
