import express from "express";
import { ingestSensorData, getSensorData } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/ingest", ingestSensorData);
router.get("/:deviceId/latest", getSensorData);

export default router;
