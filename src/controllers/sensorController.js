import SensorReading from "../models/SensorReading.js";

const ingestSensorData = async (req, res) => {
  try {
    const { deviceId, temperature, timeStamp } = req.body;
    if (!deviceId || temperature === undefined) {
      return res.status(400).json({ error: "deviceId and temperature are required" });
    }
    const newReading = await SensorReading.create({
      deviceId,
      temperature,
      timeStamp: timeStamp ? timeStamp : Date.now()
    });
    return res.status(201).json({ message: "Sensor data ingested successfully", data: newReading });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getSensorData = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    if (!deviceId) {
      return res.status(400).json({ error: "Device ID is required" });
    }
    const latestReading = await SensorReading.findOne({ deviceId }).sort({ timeStamp: -1 });
    if (!latestReading) {
      return res.status(404).json({ error: "No data found for the specified device ID" });
    }
    return res.status(200).json({ data: latestReading });
  } catch (err) {
    return res.status(500).json({ error: "Error while fetching sensor data, please try again" });
  }
};

export { ingestSensorData, getSensorData };
