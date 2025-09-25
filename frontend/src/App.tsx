import MapView from './components/MapView'
import Uploader from './components/Uploader'


export default function App() {
return (
<div style={{ height: '100vh', width: '100vw', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
<header style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
<h3 style={{ margin: 0 }}>DroneImaging</h3>
<Uploader />
</header>
<MapView />
</div>
)
}