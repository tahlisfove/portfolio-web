import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

/* point d'entrée de l'application */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* pour gérer la langue */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
