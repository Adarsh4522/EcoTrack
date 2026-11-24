
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/db");

const observationRoutes = require("./routes/observationRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use((req, res, next) => {
    console.log("REQUEST METHOD:", req.method);
    console.log("REQUEST URL:", req.originalUrl);
    next();
});

// Security middleware
app.use(helmet());

// Frontend connection
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
}));

// Parse JSON requests
app.use(express.json());
app.use((req, res, next) => {
    if (req.originalUrl.includes("/resolve")) {
        console.log("RESOLVE REQUEST BODY:", req.body);
    }
    next();
});

// Observation routes
app.use("/api/observations", observationRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/auth", authRoutes);
// Health check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "EcoTrack backend is running!"
    });
});

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`EcoTrack backend running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
