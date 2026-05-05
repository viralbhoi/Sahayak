import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import {
    MapPin,
    Briefcase,
    CheckCircle,
    Loader2,
    MessageSquare,
} from "lucide-react";

function WorkerJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState(null); // Tracks which job is currently being accepted

    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs/worker-feed");
            setJobs(res.data.data);
        } catch (err) {
            console.error("Failed to fetch job feed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(() => fetchJobs(), 5000);
        return () => clearInterval(interval);
    }, []);

    const acceptJob = async (id) => {
        setAcceptingId(id);
        try {
            await api.post(`/jobs/${id}/accept`);
            await fetchJobs();
        } catch (err) {
            console.error("Failed to accept job");
            alert("Could not accept the job at this time.");
        } finally {
            setAcceptingId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-stone-900">
                    Available Jobs
                </h2>
                <p className="text-stone-500 mt-1">
                    Live feed of work requests matching your skills and city.
                </p>
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
            ) : (
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
