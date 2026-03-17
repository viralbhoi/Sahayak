import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import {
    MapPin,
    Briefcase,
    ChevronRight,
    PlusCircle,
    Users,
} from "lucide-react";

function ClientJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs/my-jobs");
            setJobs(res.data.data);
        } catch (err) {
            console.error("Failed to fetch jobs");
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(() => fetchJobs(), 5000);
        return () => clearInterval(interval);
    }, []);

    // Helper to style the status badge beautifully
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "in progress":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-amber-100 text-amber-800 border-amber-200"; // Pending/Open
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-stone-900">
                        My Posted Jobs
                    </h2>
                    <p className="text-stone-500 mt-1">
                        Manage your job listings and view matched workers.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/jobs/create")}
                    className="flex items-center gap-2 bg-amber-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-900 transition-all shadow-sm"
                >
                    <PlusCircle className="w-5 h-5" /> Post New Job
                </button>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center">
                    <div className="bg-stone-50 p-4 rounded-full mb-4">
                        <Briefcase className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                        No jobs posted yet
                    </h3>
                    <p className="text-stone-500 max-w-sm mb-6">
                        You haven't created any job requests. Post a job to
                        start finding local workers.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white border border-stone-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-stone-900 capitalize">
                                        {job.skill}
                                    </h3>

                                    <span
                                        className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(job.status)}`}
                                    >
                                        {job.status || "Open"}
                                    </span>

                                    {/* Inside ClientJobs.jsx next to the status badge */}
                                    {job.status === "completed" && (
                                        <button
                                            onClick={async () => {
                                                const rating = prompt(
                                                    "Rate this worker out of 5:",
                                                );
                                                if (rating && rating <= 5) {
                                                    await api.post(
                                                        `/jobs/${job.id}/rate`,
                                                        {
                                                            rating: Number(
                                                                rating,
                                                            ),
                                                        },
                                                    );
                                                    alert("Rating submitted!");
                                                }
                                            }}
                                            className="ml-4 text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold hover:bg-amber-200"
                                        >
                                            ⭐ Rate Worker
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-stone-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />{" "}
                                        {job.area}, {job.city}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/jobs/${job.id}/matches`)
                                }
                                className="flex items-center justify-center gap-2 bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 hover:border-amber-300 px-6 py-3 rounded-xl font-semibold transition-all w-full md:w-auto shrink-0"
                            >
                                <Users className="w-4 h-4" /> View Matches{" "}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}

export default ClientJobs;
