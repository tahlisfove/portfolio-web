import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
