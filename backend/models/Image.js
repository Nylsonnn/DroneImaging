const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    url: String,
    gps: {
        latitude: Number,
        longitude: Number
    },
    uploadedBy: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", ImageSchema);

