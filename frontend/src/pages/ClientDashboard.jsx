import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import Card from "../components/Card";
import Button from "../components/Button";
import {
    Briefcase,
    Clock,
    CheckCircle,
    PlusCircle,
    ArrowRight,
    Loader2,
} from "lucide-react";

function ClientDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: "--",
        active: "--",
        completed: "--",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // TODO: Replace with your actual backend endpoint once created
                // const res = await api.get("/dashboard/client/stats");
                // setStats(res.data.data);

                // Simulating an API delay for the sleek loading state
                setTimeout(() => {
                    setStats({ total: 12, active: 3, completed: 9 });
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
                setIsLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">
                        Client Overview
                    </h1>
                    <p className="text-stone-500 mt-1">
                        Track your job postings and hiring progress.
                    </p>
                </div>
                <div className="w-full md:w-auto">
                    <Button
                        onClick={() => navigate("/jobs/create")}
                        className="py-2.5 px-5"
                    >
                        <PlusCircle className="w-5 h-5" /> Post New Job
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Jobs Card */}
                <Card className="flex items-start justify-between group">
                    <div>
                        <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                            Total Posted
                        </p>
                        <h2 className="text-4xl font-extrabold text-stone-900 mt-2">
                            {isLoading ? (
                                <Loader2 className="w-8 h-8 animate-spin text-stone-400 mt-1" />
                            ) : (
                                stats.total
                            )}
                        </h2>
                    </div>
                    <div className="p-3 bg-stone-100 text-stone-600 rounded-xl group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                        <Briefcase className="w-6 h-6" />
                    </div>
                </Card>

                {/* Active Jobs Card */}
                <Card className="flex items-start justify-between group border-amber-100">
                    <div>
                        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                            Active Jobs
                        </p>
                        <h2 className="text-4xl font-extrabold text-stone-900 mt-2">
                            {isLoading ? (
                                <Loader2 className="w-8 h-8 animate-spin text-amber-400 mt-1" />
                            ) : (
                                stats.active
                            )}
                        </h2>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <Clock className="w-6 h-6" />
                    </div>
                </Card>

                {/* Completed Jobs Card */}
                <Card className="flex items-start justify-between group border-emerald-100">
                    <div>
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                            Completed
                        </p>
                        <h2 className="text-4xl font-extrabold text-stone-900 mt-2">
                            {isLoading ? (
                                <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mt-1" />
                            ) : (
                                stats.completed
                            )}
                        </h2>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                </Card>
            </div>

            {/* Quick Action / Promotional Banner */}
            <div className="bg-linear-to-r from-stone-900 to-stone-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2">Need help today?</h3>
                    <p className="text-stone-400">
                        Workers in your area are currently active and ready to
                        be hired.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/jobs")}
                    className="flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors shrink-0 shadow-sm"
                >
                    View My Jobs <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </DashboardLayout>
    );
}

export default ClientDashboard;
