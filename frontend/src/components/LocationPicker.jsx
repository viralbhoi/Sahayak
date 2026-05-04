import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationPicker({ setLocation }) {
    const [position, setPosition] = useState(null);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                setLocation(e.latlng);
            },
        });

        return position ? <Marker position={position} /> : null;
    }

    return (
        <MapContainer
            center={[21.1702, 72.8311]} // Surat default
            zoom={13}
            className="h-64 w-full rounded-xl"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
        </MapContainer>
    );
}

export default LocationPicker;
