const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// Get all images
router.get("/", async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload an image (Placeholder for file upload logic)
router.post("/", async (req, res) => {
    const { url, gps, uploadedBy } = req.body;
    try {
        const newImage = new Image({ url, gps, uploadedBy });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

