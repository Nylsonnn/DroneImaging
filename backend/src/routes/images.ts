import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Image from '../models/Image.js';
import { parseExif } from '../utils/exif.js';


const router = Router();


const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
destination: (_, __, cb) => cb(null, uploadDir),
filename: (_, file, cb) => {
const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
cb(null, unique + path.extname(file.originalname));
}
});


const upload = multer({ storage });


// POST /api/images — single upload
router.post('/', upload.single('image'), async (req, res) => {
try {
if (!req.file) return res.status(400).json({ error: 'No file uploaded' });


const exif = await parseExif(req.file.path);
const lat = req.body.lat ? Number(req.body.lat) : exif?.gps?.lat;
const lon = req.body.lon ? Number(req.body.lon) : exif?.gps?.lon;


const doc = await Image.create({
url: `/uploads/${req.file.filename}`,
filename: req.file.originalname,
lat, lon,
capturedAt: exif?.capturedAt,
exif: exif?.raw
});


res.status(201).json(doc);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Upload failed' });
}
});


// GET /api/images?bbox=west,south,east,north
router.get('/', async (req, res) => {
const bbox = (req.query.bbox as string)?.split(',').map(Number);
const query: any = {};
if (bbox && bbox.length === 4) {
const [w, s, e, n] = bbox;
query.lat = { $gte: s, $lte: n };
query.lon = { $gte: w, $lte: e };
}
const items = await Image.find(query).sort({ createdAt: -1 }).limit(1000);
res.json(items);
});


export default router;