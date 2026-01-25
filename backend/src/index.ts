import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import projectsRouter from "./routes/projects";
import contactRouter from "./routes/contact";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-web-production-586a.up.railway.app",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

/* limiteur de requêtes pour le formulaire contact */
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Trop de demandes. Veuillez réessayer plus tard.",
});

/* routes principales de l’API */
app.use("/projects", projectsRouter);
app.use("/contact", contactLimiter, contactRouter);

/* route racine pour vérifier que le serveur fonctionne */
app.get("/", (_req, res) => {
  res.json({
    message: "Backend API is running!",
    routes: {
      projects: {
        url: "/projects",
        method: "GET",
        description: "Récupère la liste des projets"
      },
      contact: {
        url: "/contact",
        method: "POST",
        description: "Envoie un email via le formulaire de contact"
      }
    }
  });
});


/* démarrage du serveur */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
