import React from "react";
import MapComponent from "./components/MapComponent";

function App() {
    return (
        <div>
            <h1>📡 Drone Image Map</h1>
            <p>Click on markers to view images captured by the drone.</p>
            <MapComponent />
        </div>
    );
}

export default App;
