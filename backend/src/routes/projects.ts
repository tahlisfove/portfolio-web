import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/* récupère les projets de la base de données */
router.get("/", async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "erreur lors de la récupération des projets" });
  }
});

export default router;
