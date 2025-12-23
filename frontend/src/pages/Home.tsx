/* page home */

import { useLanguage } from "../context/LanguageContext";
import { useProjects, type Project } from "../hooks/importProjects";
import Loader from "../components/Loader";
import Work from "../components/Work";
import "../styles/Home.css";
import "../styles/Buttons.css";
import Stack from "../components/Stack";

interface HomeProps {
  setPage: (page: "home" | "projects" | "contact") => void;
}

/* ajoute l'effet bold aux mots entourés de ** dans le json */
function renderBoldText(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  const { language, t } = useLanguage();
  const { projects, showLoader } = useProjects();

  /* tri des projets pour affichage */
  const projectOrder = [
    projects.find(p => p.title === "Portfolio personnel interactif"),
    projects.find(p => p.title === "Application de gestion de tâches"),
    projects.find(p => p.title === "Site de Gestion de budget Partagé")
  ].filter(Boolean) as Project[];

  const yearLabels = [t("home.projects.years.ongoing"), "2025", "2024", "2023"];

  /* récupération des variables d’environnement */
  const LINKEDIN = import.meta.env.VITE_LINKEDIN;
  const INSTAGRAM = import.meta.env.VITE_INSTAGRAM;
  const GITHUB = import.meta.env.VITE_GITHUB;
  const SPOTIFY = import.meta.env.VITE_SPOTIFY;
  const CV_FR = import.meta.env.VITE_CV_FR
  const CV_EN = import.meta.env.VITE_CV_EN

  /* sélection du CV selon la langue */
  const cvFile = language === "fr" ? CV_FR : CV_EN

  return (
    <div className="home-container">

      {/* section hero avec présentation */}
      <section className="hero" aria-label={t("home.hero.sectionAria")} role="region">
        <div className="hero-content">
          <div className="hero-photo" aria-label={t("home.hero.photoAria")}>
            <img src={import.meta.env.VITE_PROFILE_PHOTO} alt={t("home.hero.photoAlt")} className="photo-placeholder"/>
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
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir Instagram dans un nouvel onglet" : "open Instagram in new tab"}>
              <img src="/icons/logos/instagram.webp" alt="Instagram" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir LinkedIn dans un nouvel onglet" : "open LinkedIn in new tab"}>
              <img src="/icons/logos/linkedin2.webp" alt="LinkedIn" />
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir GitHub dans un nouvel onglet" : "open GitHub in new tab"}>
              <img src="/icons/logos/github.webp" alt="GitHub" />
            </a>
            <a href={SPOTIFY} target="_blank" rel="noopener noreferrer"
               aria-label={language === "fr" ? "ouvrir Spotify dans un nouvel onglet" : "open Spotify in new tab"}>
              <img src="/icons/logos/spotify.webp" alt="Spotify" />
            </a>
          </div>

          {/* bouton contact */}
          <div className="buttons-presentation">
            <button className="btn-contact" onClick={() => setPage("contact")} aria-label={t("home.hero.contactBtn")}>
              {t("home.hero.contactBtn")}
              <img src="/icons/logos/contact.webp" alt="Contact Icon" className="contact-icon" />
            </button>

            <div className="contact-cv">
              <a href={cvFile} download
                aria-label={
                  language === "fr"
                    ? "telecharger le CV de Samuel"
                    : "download Samuel's CV"
                }
              >
                {t("contact.cv")}
                <img src="/icons/logos/cv.webp" alt={language === "fr" ? "icone cv" : "cv icon"} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* section présentation */}
      <section className="about" aria-label={t("home.about.sectionAria")} role="region">
        <h2 id="about-title">{t("home.about.title")}</h2>
        <p>{renderBoldText(t("home.about.p1"))}</p>
        <p>{renderBoldText(t("home.about.p2"))}</p>
        <p>{renderBoldText(t("home.about.p3"))}</p>
      </section>

      {/* section stack technologique */}
      <Stack />

      {/* section expérience professionnelle */}
      <Work />

      {/* section projets mis en avant */}
      <section className="featured-projects" aria-label={t("home.projects.sectionAria")} role="region">
        <h2 id="projects-title">{t("home.projects.sectionTitle")}</h2>

        {/* chargement des projets si backend off */}
        {showLoader && <Loader text={t("home.projects.loading")} />}

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
