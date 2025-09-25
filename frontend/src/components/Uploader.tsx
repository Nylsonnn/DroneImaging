import { useState } from 'react'


export default function Uploader() {
const [file, setFile] = useState<File | null>(null)
const [lat, setLat] = useState<string>('')
const [lon, setLon] = useState<string>('')


const onUpload = async () => {
if (!file) return
const fd = new FormData()
fd.append('image', file)
if (lat) fd.append('lat', lat)
if (lon) fd.append('lon', lon)
const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/images`, {
method: 'POST', body: fd
})
if (!res.ok) alert('Upload failed')
setFile(null); setLat(''); setLon('')
}


return (
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
<input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
<input placeholder="lat (optional)" value={lat} onChange={e => setLat(e.target.value)} style={{ width: 120 }} />
<input placeholder="lon (optional)" value={lon} onChange={e => setLon(e.target.value)} style={{ width: 120 }} />
<button onClick={onUpload} disabled={!file}>Upload</button>
</div>
)
}