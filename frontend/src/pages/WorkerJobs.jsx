import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import WorkerJobMap from "../components/WorkerJobMap";
import {
    MapPin,
    Briefcase,
    CheckCircle,
    Loader2,
    MessageSquare,
    Map as MapIcon,
    List,
} from "lucide-react";

function WorkerJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState(null);
    const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
    const [workerLocation, setWorkerLocation] = useState(null);
    const [radius, setRadius] = useState(10);

    const fetchJobs = async () => {
        try {
            const res = await api.get(`/jobs/worker-feed?radius=${radius}`);
            setJobs(res.data.data);
        } catch (err) {
            console.error("Failed to fetch job feed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch Jobs
        fetchJobs();

        fetchWorkerLocation();

        // Auto refresh
        const interval = setInterval(() => {
            fetchJobs();
            fetchWorkerLocation();
        }, 5000);

        return () => clearInterval(interval);
    }, [radius]);

    const fetchWorkerLocation = async () => {
        try {
            const workerData = await api.get("/workers/me");

            if (workerData.data.data.lat && workerData.data.data.lng) {
                setWorkerLocation({
                    lat: workerData.data.data.lat,
                    lng: workerData.data.data.lng,
                });
            }
        } catch (err) {
            console.error("Failed to fetch worker location");
        }
    };

    const acceptJob = async (id) => {
        setAcceptingId(id);
        try {
            await api.post(`/jobs/${id}/accept`);
            await fetchJobs(); // Refresh jobs after accepting
        } catch (err) {
            console.error("Failed to accept job");
            alert("Could not accept the job at this time.");
        } finally {
            setAcceptingId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-stone-900">
                        Available Jobs
                    </h2>
                    <p className="text-stone-500 mt-1">
                        Live feed of work requests matching your skills and
                        city.
                    </p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-stone-600">
                        Search Radius:
                    </span>

                    <select
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="border border-stone-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                    </select>
                </div>

                {/* View Toggle Controls */}
                <div className="flex items-center bg-stone-100 p-1 rounded-xl w-max border border-stone-200">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            viewMode === "list"
                                ? "bg-white text-stone-900 shadow-sm"
                                : "text-stone-500 hover:text-stone-700"
                        }`}
                    >
                        <List className="w-4 h-4" /> List
                    </button>
                    <button
                        onClick={() => setViewMode("map")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            viewMode === "map"
                                ? "bg-white text-stone-900 shadow-sm"
                                : "text-stone-500 hover:text-stone-700"
                        }`}
                    >
                        <MapIcon className="w-4 h-4" /> Map
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-800" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center">
                    <div className="bg-stone-50 p-4 rounded-full mb-4">
                        <Briefcase className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                        No jobs available right now
                    </h3>
                    <p className="text-stone-500 max-w-sm">
                        We are constantly looking for new requests. Check back
                        in a few minutes!
                    </p>
                </div>
            ) : viewMode === "map" ? (
                /* Map View Rendering */
                <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm">
                    <WorkerJobMap
                        workerLocation={workerLocation}
                        jobs={jobs}
                        onAccept={acceptJob}
                    />
                </div>
            ) : (
                /* List View Rendering */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                        >
                            {/* Job Details */}
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-amber-100 p-2.5 rounded-xl text-amber-800">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-stone-900 capitalize">
                                            {job.skill}
                                        </h3>
                                    </div>
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide rounded-full border border-emerald-100">
                                        New
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6 text-stone-600 font-medium">
                                    <p className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-stone-400" />
                                        {job.area}, {job.city}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                    {job.distance?.toFixed(2)} km away
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-stone-100">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900 py-2.5 rounded-xl font-semibold transition-colors">
                                    <MessageSquare className="w-4 h-4" />{" "}
                                    Details
                                </button>

                                <button
                                    onClick={() => acceptJob(job.id)}
                                    disabled={acceptingId === job.id}
                                    className={`flex-2 flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold text-white transition-all
                                        ${
                                            acceptingId === job.id
                                                ? "bg-amber-800/70 cursor-not-allowed"
                                                : "bg-amber-800 hover:bg-amber-900 hover:shadow-md"
                                        }
                                    `}
                                >
                                    {acceptingId === job.id ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />{" "}
                                            Accept Job
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}

export default WorkerJobs;
