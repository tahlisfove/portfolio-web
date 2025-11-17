/* chargement des projets */

import React from "react";
import "../styles/Loader.css";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="loading-wrapper">
      {text && <p>{text}</p>}
      <div className="loader">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Loader;

