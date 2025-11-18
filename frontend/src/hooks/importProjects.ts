import { useState, useEffect } from "react";

export interface Project {
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

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const API_URL: string = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

  /* loader après 1 seconde */
  useEffect(() => {
    let timer: number;
    if (loading) {
      timer = window.setTimeout(() => setShowLoader(true), 1000);
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  /* fetch projects */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur récupération projets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [API_URL]);

  return { projects, loading, showLoader };
};
