import mongoose from "mongoose";

const sensorReadingSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, "Device ID is required"],
    index: true
  },
  temperature: {
    type: Number,
    required: [true, "Temperature is required"]
  },
  timeStamp: {
    type: Number,
    required: [true, "Timestamp is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SensorReading = mongoose.model("SensorReading", sensorReadingSchema);
export default SensorReading;
