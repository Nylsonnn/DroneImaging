import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useEffect, useState } from 'react'
import L from 'leaflet'


const icon = new L.Icon({
iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
iconSize: [25, 41], iconAnchor: [12, 41]
})


function useBoundsImages() {
const map = useMap()
const [images, setImages] = useState<any[]>([])


async function fetchImages() {
const b = map.getBounds()
const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].join(',')
const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/images?bbox=${bbox}`)
const data = await res.json()
setImages(data)
}


useEffect(() => {
fetchImages()
map.on('moveend', fetchImages)
return () => { map.off('moveend', fetchImages) }
}, [])


return images
}


export default function MapView() {
const images = useBoundsImages()
return (
<MapContainer center={[51.5074, -0.1278]} zoom={10} style={{ height: '100%', width: '100%' }}>
<TileLayer url={import.meta.env.VITE_MAP_TILE_URL} />
<MarkerClusterGroup>
{images.filter(i => i.lat && i.lon).map(i => (
<Marker key={i._id} position={[i.lat, i.lon]} icon={icon}>
<Popup>
<div style={{ maxWidth: 240 }}>
<img src={`${import.meta.env.VITE_API_BASE}${i.url}`} alt={i.filename} style={{ width: '100%', borderRadius: 6 }} />
<div style={{ fontSize: 12, marginTop: 6 }}>
<div><b>{i.filename}</b></div>
{i.capturedAt && <div>{new Date(i.capturedAt).toLocaleString()}</div>}
{i.lat && i.lon && <div>{i.lat.toFixed(6)}, {i.lon.toFixed(6)}</div>}
</div>
</div>
</Popup>
</Marker>
))}
</MarkerClusterGroup>
</MapContainer>
)
}