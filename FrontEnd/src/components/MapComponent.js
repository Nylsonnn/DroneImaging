import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/images")
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {images.map((image, index) => (
                <Marker key={index} position={[image.gps.latitude, image.gps.longitude]}>
                    <Popup>
                        <img src={image.url} alt="Drone Image" width="200px" />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
