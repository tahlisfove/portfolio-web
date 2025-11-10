import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des projets" });
  }
});

export default router;
