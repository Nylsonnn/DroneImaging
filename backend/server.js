require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected successfully!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define the Image Schema
const ImageSchema = new mongoose.Schema({
    url: String,
    gps: {
        latitude: Number,
        longitude: Number
    }
});

const Image = mongoose.model("Image", ImageSchema);

// ✅ ROUTE: Fetch all drone images
app.get("/api/images", async (req, res) => {
    try {
        const images = await Image.find();  // Fetch images from MongoDB
        res.json(images);
    } catch (error) {
        console.error("❌ Error fetching images:", error);
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

// ✅ ROUTE: Load test images into the database
const testImages = require("./test_images.json");

app.post("/api/images/load-test", async (req, res) => {
    try {
        await Image.insertMany(testImages);
        res.json({ success: true, message: "Test images added!" });
    } catch (error) {
        console.error("❌ Error inserting test images:", error);
        res.status(500).json({ error: "Failed to insert images" });
    }
});

// Default Route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
