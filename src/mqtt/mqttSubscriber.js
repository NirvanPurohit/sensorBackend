import mqtt from "mqtt";
import SensorReading from "../models/SensorReading.js";

const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("iot/sensor/+/temperature");
});

client.on("message", async (topic, message) => {
  try {
    const parts = topic.split("/");
    const deviceId = parts[2];
    const temperature = Number(message.toString());

    if (isNaN(temperature)) return;

    await SensorReading.create({
      deviceId,
      temperature,
      timeStamp: Date.now()
    });

    console.log(`MQTT saved → ${deviceId}: ${temperature}`);
  } catch (err) {
    console.error("MQTT error:", err.message);
  }
});

export default client;
