require("dotenv").config();

console.log("🚀 Attempting to start backend...");
console.log("🔍 Checking .env values...");
console.log("🔹 MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Not Loaded");
console.log("🔹 PORT:", process.env.PORT || "❌ Not Loaded");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("✅ Express initialized");

// 🔥 LOG BEFORE MONGODB CONNECTION ATTEMPT
console.log("🔍 Attempting to connect to MongoDB...");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully!"))
    .catch(err => {
        console.log("❌ MongoDB connection failed:");
        console.error(err);
        process.exit(1); // Stop server if DB connection fails
    });

// Test route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
