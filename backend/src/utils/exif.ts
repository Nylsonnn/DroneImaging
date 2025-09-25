import * as exifr from 'exifr';


export async function parseExif(path: string) {
try {
const output = await exifr.parse(path, { gps: true, tiff: true, ifd0: true, exif: true });
if (!output) return {} as any;
const { latitude, longitude, DateTimeOriginal } = output as any;
return {
gps: { lat: latitude, lon: longitude },
capturedAt: DateTimeOriginal ? new Date(DateTimeOriginal) : undefined,
raw: output
};
} catch (e) {
return {} as any;
}
}