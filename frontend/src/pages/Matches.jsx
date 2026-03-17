import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import { UserCircle, Phone, MapPin, ArrowLeft, Star } from "lucide-react";

function Matches() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMatches = async () => {
        try {
            const res = await api.get(`/jobs/${id}/matches`);
            setWorkers(res.data.data);
        } catch (err) {
            console.error("Failed to fetch matches");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, [id]);

    return (
        <DashboardLayout>
            {/* Header with Back Button */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/jobs")}
                    className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to My Jobs
                </button>
                <h2 className="text-3xl font-bold text-stone-900">
                    Matched Workers
                </h2>
                <p className="text-stone-500 mt-1">
                    Here are the local workers available for this job.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin"></div>
                </div>
            ) : workers.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center">
                    <div className="bg-stone-50 p-4 rounded-full mb-4">
                        <UserCircle className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                        No matches yet
                    </h3>
                    <p className="text-stone-500 max-w-sm">
                        We are still looking for workers matching your criteria.
                        Check back soon!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map((worker) => (
                        <div
                            key={worker.id}
                            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center group"
                        >
                            {/* Worker Avatar Placeholder */}
                            <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <UserCircle className="w-10 h-10" />
                            </div>

                            <h3 className="text-xl font-bold text-stone-900 mb-1">
                                {worker.name}
                            </h3>

                            {/* Faux Rating for visual trust (you can connect this to DB later) */}
                            <div className="flex items-center gap-1 text-emerald-600 mb-3">
                                <Star className="w-4 h-4 fill-emerald-600" />
                                <span className="text-sm font-bold">4.9</span>
                            </div>

                            <p className="flex items-center gap-1.5 text-stone-500 text-sm mb-6">
                                <MapPin className="w-4 h-4" /> {worker.city}
                            </p>

                            {/* Action Button: Opens the phone dialer natively */}
                            <a
                                href={`tel:${worker.phone}`}
                                className="w-full flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-xl font-semibold transition-colors"
                            >
                                <Phone className="w-4 h-4" /> Call{" "}
                                {worker.phone}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}

export default Matches;
