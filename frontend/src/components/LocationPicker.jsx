import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// 2. Move LocationMarker OUTSIDE the main component
function LocationMarker({ position, setPosition, setLocation }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setLocation(e.latlng);
        },
    });

    // Apply the custom icon to the marker
    return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

function LocationPicker({ setLocation }) {
    const [position, setPosition] = useState(null);

    return (
        <MapContainer
            center={[21.1702, 72.8311]} // Surat default
            zoom={13}
            className="h-80 w-full rounded-xl"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Pass state as props */}
            <LocationMarker
                position={position}
                setPosition={setPosition}
                setLocation={setLocation}
            />
        </MapContainer>
    );
}

export default LocationPicker;
