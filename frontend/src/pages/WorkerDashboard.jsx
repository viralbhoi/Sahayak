import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Card from "../components/Card";
import Button from "../components/Button";
import {
    Search,
    MapPin,
    Star,
    ChevronRight,
    Loader2,
    CheckCircle,
} from "lucide-react";

function WorkerDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        rating: "--",
        completed: "--",
        area: "Loading...",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating an API call to fetch worker stats
        const fetchWorkerStats = async () => {
            try {
                // TODO: Replace with your actual backend endpoint
                // const res = await api.get("/dashboard/worker/stats");
                // setStats(res.data.data);

                setTimeout(() => {
                    setStats({
                        rating: "4.8",
                        completed: 24,
                        area: "Surat Central",
                    });
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error("Failed to fetch worker stats", error);
                setIsLoading(false);
            }
        };

        fetchWorkerStats();
    }, []);

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                {/* Welcome Hero Card */}
                <div className="bg-amber-800 rounded-3xl p-8 md:p-12 text-white shadow-lg mb-8 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                            Welcome back to Sahayak!
                        </h1>
                        <p className="text-amber-100 text-lg mb-8 leading-relaxed">
                            There are new job postings in your registered city
                            right now. Check the feed to secure your next gig
                            today and keep your earnings growing.
                        </p>

                        {/* Using our custom Button component with a white variant override via className */}
                        <button
                            onClick={() => navigate("/worker/jobs")}
                            className="flex items-center gap-2 bg-white text-amber-900 px-8 py-3.5 rounded-xl font-bold hover:bg-amber-50 hover:-translate-y-0.5 transition-all shadow-sm"
                        >
                            <Search className="w-5 h-5" /> Browse Available Jobs
                        </button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-4 px-1">
                    Your Performance
                </h3>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Rating Card */}
                    <Card className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Star className="w-5 h-5 fill-amber-500" />
                            </div>
                            <p className="font-semibold text-stone-600">
                                Current Rating
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-stone-900 mt-1">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-stone-400 mt-2" />
                            ) : (
                                <>
                                    {stats.rating}{" "}
                                    <span className="text-sm font-medium text-stone-400">
                                        / 5.0
                                    </span>
                                </>
                            )}
                        </p>
                    </Card>

                    {/* Completed Jobs Card */}
                    <Card className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <p className="font-semibold text-stone-600">
                                Completed Jobs
                            </p>
                        </div>
                        <p className="text-3xl font-bold text-stone-900 mt-1">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-stone-400 mt-2" />
                            ) : (
                                stats.completed
                            )}
                        </p>
                    </Card>

                    {/* Active Work Area Card */}
                    <Card className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <p className="font-semibold text-stone-600">
                                Work Area
                            </p>
                        </div>
                        <p className="text-xl font-bold text-stone-900 mt-2 truncate">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
                            ) : (
                                stats.area
                            )}
                        </p>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default WorkerDashboard;
