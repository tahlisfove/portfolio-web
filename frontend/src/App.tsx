import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import "./App.css";
import { useLanguage } from "./context/LanguageContext";

/* durée de la transition entre pages */
const TRANSITION_TIME = 200;

const App: React.FC = () => {
  /* page actuellement sélectionnée */
  const [page, setPage] = useState<"home" | "projects" | "contact" | "privacy">("home");
  const [displayPage, setDisplayPage] = useState(page);
  const [transitioning, setTransitioning] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const { language } = useLanguage();

  /* fonction pour changer de page avec animation */
  const handlePageChange = (newPage: typeof page) => {
    if (newPage === page) return;

    /* déclenche transition */
    setTransitioning(true);
  
    setTimeout(() => {
      setDisplayPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPage(newPage);
      setTransitioning(false);
      setShowFooter(true);
    }, TRANSITION_TIME);
  };

  /* transition lors du changement de langue */
  useEffect(() => {
    setTransitioning(true);

    const timer = setTimeout(() => {
      setTransitioning(false);
      setShowFooter(true);
    }, TRANSITION_TIME);

    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className="app-wrapper">
      {/* header */}
      <Header setPage={handlePageChange} activePage={page} />

      <main className="main-content">
        {/* classe de transition */}
        <div className={`page-transition ${transitioning ? "fade-out" : "fade-in"}`}>
          <>
            {/* affichage des pages */}
            {displayPage === "home" && <Home setPage={handlePageChange} />}
            {displayPage === "projects" && <Projects />}
            {displayPage === "contact" && <Contact />}
            {displayPage === "privacy" && <Privacy />}
          </>
        </div>
      </main>

      {/* footer avec classe dynamique */}
      <div className={showFooter ? "footer-visible" : "footer-hidden"}>
        <Footer setPage={handlePageChange} />
      </div>
    </div>
  );
};

export default App;
