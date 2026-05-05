import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import {
    MapPin,
    Briefcase,
    CheckCircle,
    Loader2,
    MessageSquare,
    Play,
} from "lucide-react";

function WorkerAssignedJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingId, setLoadingId] = useState(null);

    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs/worker-assignments");
            setJobs(res.data.data);
        } catch (err) {
            console.error("Failed to fetch assigned jobs");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const startJob = async (id) => {
        setLoadingId(id);
        try {
            await api.patch(`/jobs/${id}/start`);
            fetchJobs();
        } catch {
            alert("Failed to start job");
        } finally {
            setLoadingId(null);
        }
    };

    const completeJob = async (id) => {
        setLoadingId(id);
        try {
            await api.patch(`/jobs/${id}/complete`);
            fetchJobs();
        } catch {
            alert("Failed to complete job");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-stone-900">
                    My Assigned Jobs
                </h2>
                <p className="text-stone-500 mt-1">
                    Manage your active work and communicate with clients.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-800" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center text-stone-500">
                    No active jobs assigned.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                        >
                            {/* Job Info */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold capitalize">
                                        {job.skill}
                                    </h3>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-semibold
                      ${
                          job.status === "accepted"
                              ? "bg-yellow-100 text-yellow-700"
                              : job.status === "in_progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                      }
                    `}
                                    >
                                        {job.status}
                                    </span>
                                </div>

                                <p className="flex items-center gap-2 text-stone-600">
                                    <MapPin className="w-4 h-4" />
                                    {job.area}, {job.city}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                {/* Chat */}
                                <button
                                    onClick={() => navigate(`/chat/${job.id}`)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-semibold"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Chat
                                </button>

                                {/* Start */}
                                {job.status === "accepted" && (
                                    <button
                                        onClick={() => startJob(job.id)}
                                        disabled={loadingId === job.id}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
                                    >
                                        {loadingId === job.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Play className="w-4 h-4" />
                                                Start
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Complete */}
                                {job.status === "in_progress" && (
                                    <button
                                        onClick={() => completeJob(job.id)}
                                        disabled={loadingId === job.id}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold"
                                    >
                                        {loadingId === job.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Complete
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}

export default WorkerAssignedJobs;
