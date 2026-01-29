import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/connectDB.js";
import "./src/mqtt/mqttSubscriber.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
