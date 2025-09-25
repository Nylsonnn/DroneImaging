import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import images from './routes/images.js';
import health from './routes/health.js';
import cors from 'cors';


const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());


// static serving for uploads
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadDir));


app.use('/api/health', health);
app.use('/api/images', images);


const PORT = Number(process.env.PORT || 4000);


async function start() {
await mongoose.connect(process.env.MONGO_URI as string);
app.listen(PORT, () => console.log(`API on :${PORT}`));
}


start().catch(err => {
console.error('Failed to start server', err);
process.exit(1);
});