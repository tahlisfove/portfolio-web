import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import projectsRouter from "./routes/projects";
import contactRouter from "./routes/contact";

const app = express();

/* render passe les requêtes via un proxy */
app.set("trust proxy", 1);

/* middlewares */
app.use(cors());
app.use(express.json());

/* limiteur de requêtes pour éviter le spam */
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Trop de demandes. Veuillez réessayer plus tard.",
});

/* routes principales de l’api */
app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactLimiter, contactRouter);

/* démarrage du serveur */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
