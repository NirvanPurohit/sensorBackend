import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Routes
app.use("/api/sensors", sensorRoutes);

export default app;
