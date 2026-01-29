# sensorBackend

## Overview

`sensorBackend` is a Node.js backend service designed to ingest, store, and retrieve temperature sensor data. It supports two ingestion methods:

1. REST APIs for direct HTTP-based sensor data submission
2. MQTT subscription for real-time ingestion from IoT devices

The backend stores sensor readings in MongoDB and exposes endpoints to fetch the latest reading for a specific device. The project is structured to be simple, modular, and easy to extend, making it suitable for real-world IoT or monitoring use cases.

## Features

* REST API to ingest sensor temperature data
* MQTT subscriber for real-time sensor ingestion
* MongoDB persistence using Mongoose
* Fetch latest sensor reading by device ID
* Input validation and proper error handling
* Modular architecture (routes, controllers, models)
* CORS-enabled for frontend integration

## Tech Stack

* Node.js & Express
* MongoDB with Mongoose
* MQTT (Mosquitto public broker)
* dotenv for environment configuration
* CORS for cross-origin requests

## Project Structure

```
sensorBackend/
│
├── src/
│   ├── app.js
│   ├── controllers/
│   │   └── sensorController.js
│   ├── routes/
│   │   └── sensorRoutes.js
│   ├── models/
│   │   └── SensorReading.js
│   ├── db/
│   │   └── connectDB.js
│   └── mqtt/
│       └── mqttSubscriber.js
│
├── index.js
├── package.json
└── .env
```

## How It Works

### REST API Ingestion

Sensor data can be sent via an HTTP `POST` request. The controller validates required fields (`deviceId` and `temperature`) before storing the data in MongoDB.

If a timestamp is not provided, the server automatically assigns the current time.

This ensures:
* Consistent data format
* Protection against invalid payloads
* Clean separation of logic using controllers

### Fetching Sensor Data

The API allows fetching the latest sensor reading for a given device ID.

Internally:
* The device ID is extracted from the route parameter
* MongoDB is queried using sorting on the timestamp
* If no data exists, a meaningful error response is returned

### MQTT Integration

In addition to REST APIs, the backend subscribes to an MQTT topic:

```
iot/sensor/+/temperature
```

* `+` represents a dynamic device ID
* Each incoming message is parsed and validated
* Valid temperature readings are stored in MongoDB automatically

This allows real-time ingestion from IoT devices without relying on HTTP requests.

## API Endpoints

### Ingest Sensor Data (REST)

**POST** `/api/sensors/ingest`

**Request Body:**

```json
{
  "deviceId": "sensor-001",
  "temperature": 28.5,
  "timeStamp": 1710000000000
}
```

**Response:**

```json
{
  "message": "Sensor data ingested successfully",
  "data": { ... }
}
```

### Get Latest Sensor Reading

**GET** `/api/sensors/:deviceId/latest`

**Response:**

```json
{
  "data": {
    "deviceId": "sensor-001",
    "temperature": 28.5,
    "timeStamp": 1710000000000
  }
}
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NirvanPurohit/sensorBackend.git
cd sensorBackend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the Server

```bash
npm start
```

The server will connect to MongoDB, start listening on the configured port, and automatically connect to the MQTT broker.


## Author
**Nirvan Purohit**
