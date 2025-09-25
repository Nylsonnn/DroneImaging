import mongoose, { Schema } from 'mongoose';


const ImageSchema = new Schema({
url: { type: String, required: true }, // served path
filename: { type: String, required: true },
lat: { type: Number, index: true },
lon: { type: Number, index: true },
capturedAt: { type: Date },
tags: [String],
notes: String,
exif: Schema.Types.Mixed
}, { timestamps: true });


ImageSchema.index({ lat: 1, lon: 1 });


export default mongoose.model('Image', ImageSchema);