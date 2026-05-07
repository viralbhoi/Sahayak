import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { Briefcase, UserPin } from "lucide-react";

// Worker icon
const workerIcon = L.divIcon({
    html: `
        <div style="
            background:#1e40af;
            width:40px;
            height:40px;
            border-radius:9999px;
            display:flex;
            align-items:center;
            justify-content:center;
            border:3px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.2);
        ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
        </div>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const jobIcon = L.divIcon({
    html: `
        <div style="
            background:#92400e;
            width:36px;
            height:36px;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            border:3px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.2);
        ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect width="20" height="14" x="2" y="7" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
        </div>
    `,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

function WorkerJobMap({ workerLocation, jobs, onAccept }) {
    // Prevent crash
    if (!workerLocation?.lat || !workerLocation?.lng) {
        return (
            <div className="h-150 flex items-center justify-center bg-stone-100 rounded-2xl text-stone-500">
                Worker location unavailable
            </div>
        );
    }

    return (
        <MapContainer
            center={[workerLocation.lat, workerLocation.lng]}
            zoom={13}
            className="h-150 w-full rounded-2xl z-0"
        >
            {/* Map tiles */}
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Worker Marker */}
            <Marker
                position={[workerLocation.lat, workerLocation.lng]}
                icon={workerIcon}
            >
                <Popup>
                    <div className="font-semibold">Your Current Location</div>
                </Popup>
            </Marker>

            {/* Job Markers */}
            {jobs.map((job) => (
                <Marker
                    key={job.id}
                    position={[job.lat, job.lng]}
                    icon={jobIcon}
                >
                    <Popup>
                        <div className="space-y-2 min-w-45">
                            <h3 className="font-bold text-lg capitalize">
                                {job.skill}
                            </h3>

                            <p className="text-sm text-stone-600">
                                {job.area}, {job.city}
                            </p>

                            <p className="text-sm text-amber-700 font-semibold">
                                {job.distance < 1
                                    ? `${Math.round(job.distance * 1000)}m away`
                                    : `${job.distance.toFixed(2)} km away`}
                            </p>

                            <button
                                onClick={() => onAccept(job.id)}
                                className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 rounded-lg font-semibold transition"
                            >
                                Accept Job
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default WorkerJobMap;
