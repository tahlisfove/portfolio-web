/* ancrage pour scroll */

import React, { useEffect, useRef } from "react";

interface TopAnchorProps {
  page: string;
}

const TopAnchor: React.FC<TopAnchorProps> = ({ page }) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      /* scroll pour remonter en haut à chaque changement de page */
      anchorRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [page]);

  /* div invisible servant d'ancre pour scroll */
  return <div ref={anchorRef} style={{ height: 0, width: 0 }} />;
};

export default TopAnchor;
