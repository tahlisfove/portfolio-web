import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./App.css";
import { useLanguage } from "./context/LanguageContext";

const App: React.FC = () => {
  const [page, setPage] = useState<"home" | "projects" | "contact">("home");
  const [transitioning, setTransitioning] = useState(false);
  const { language } = useLanguage();

  // pour déclencher une transition à chaque changement de page
  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => setTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [page, language]);

  // structure principale
  return (
    <div className="app-wrapper">
      {/* header avec navigation */}
      <Header setPage={setPage} />

      {/* contenu principal */}
      <main className="main-content">
        <div className={`page-transition ${transitioning ? "fade" : ""}`}>
          {page === "home" && <Home />}
          {page === "projects" && <Projects />}
          {page === "contact" && <Contact />}
        </div>
      </main>

      {/* footer */}
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;
