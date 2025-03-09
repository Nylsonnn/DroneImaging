import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const [images, setImages] = useState([]);

    // Fetch drone images from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/images")
            .then(res => res.json())
            .then(data => {
                console.log("📸 Drone Images Loaded:", data);
                setImages(data);
            })
            .catch(err => console.error("❌ API Fetch Error:", err));
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {images.length > 0 ? (
                images.map((image, index) => (
                    <Marker key={index} position={[image.gps.latitude, image.gps.longitude]}>
                        <Popup>
                            <img src={image.url} alt="Drone Image" width="200px" />
                        </Popup>
                    </Marker>
                ))
            ) : (
                <p>📍 No drone images found!</p>
            )}
        </MapContainer>
    );
};

export default MapComponent;
