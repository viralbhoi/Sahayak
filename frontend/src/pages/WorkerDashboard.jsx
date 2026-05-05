import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import LocationPicker from "../components/LocationPicker";
import {
    Search,
    MapPin,
    Star,
    Loader2,
    CheckCircle,
    Wrench,
    X,
    Plus,
} from "lucide-react";

function WorkerDashboard() {
    const navigate = useNavigate();

    // Stats State
    const [stats, setStats] = useState({
        rating: "--",
        completed: "--",
        area: "Loading...",
    });

    // Skills State
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [isUpdatingSkills, setIsUpdatingSkills] = useState(false);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const statsRes = await api.get("/dashboard/worker/stats");
                setStats(statsRes.data.data);
                const profileRes = await api.get(`/workers/${userId}`);
                setSkills(profileRes.data.data.skills || []);
            } catch (error) {
                console.error("Failed to fetch worker data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- Skills Management Logic ---
    const updateSkillsInDb = async (updatedSkillsArray) => {
        setIsUpdatingSkills(true);
        try {
            const userId = localStorage.getItem("userId");
            await api.patch(`/workers/${userId}/skills`, {
                skills: updatedSkillsArray,
            });
            setSkills(updatedSkillsArray);
        } catch (err) {
            console.error("Failed to update skills");
            alert("Could not update skills at this time.");
        } finally {
            setIsUpdatingSkills(false);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        const skillToAdd = newSkill.trim().toLowerCase();

        if (!skillToAdd || skills.includes(skillToAdd)) {
            setNewSkill(""); // Clear input if empty or duplicate
            return;
        }

        const updated = [...skills, skillToAdd];
        await updateSkillsInDb(updated);
        setNewSkill("");
    };

    const handleRemoveSkill = async (skillToRemove) => {
        const updated = skills.filter((s) => s !== skillToRemove);
        await updateSkillsInDb(updated);
    };

    const handleUpdateLocation = async () => {
        if (!location) return;

        setLoading(true);

        try {
            await api.patch("/workers/location", {
                lat: location.lat,
                lng: location.lng,
            });

            alert("Location updated successfully");
        } catch (err) {
            alert("Failed to update location");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                {/* Welcome Hero Card */}
                <div className="bg-amber-800 rounded-3xl p-8 md:p-12 text-white shadow-lg mb-8 relative overflow-hidden">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
                                    {Number(stats.rating).toFixed(1) > 0
                                        ? Number(stats.rating).toFixed(1)
                                        : "New"}{" "}
                                    {Number(stats.rating).toFixed(1) > 0 && (
                                        <span className="text-sm font-medium text-stone-400">
                                            / 5.0
                                        </span>
                                    )}
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
                        <p className="text-xl font-bold text-stone-900 mt-2 truncate capitalize">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
                            ) : (
                                stats.area
                            )}
                        </p>
                    </Card>
                </div>

                {/* --- NEW: Skills Manager --- */}
                <h3 className="text-xl font-bold text-stone-900 mb-4 px-1">
                    Manage Your Skills
                </h3>
                <Card>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Current Skills Display */}
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-stone-500 mb-4 flex items-center gap-2">
                                <Wrench className="w-4 h-4" /> ACTIVE SKILLS
                            </p>

                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
                            ) : skills.length === 0 ? (
                                <p className="text-stone-400 text-sm italic">
                                    No skills added yet.
                                </p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl font-semibold capitalize shadow-sm border border-amber-200"
                                        >
                                            {skill}
                                            <button
                                                onClick={() =>
                                                    handleRemoveSkill(skill)
                                                }
                                                disabled={isUpdatingSkills}
                                                className="hover:bg-amber-200 p-0.5 rounded-full transition-colors disabled:opacity-50"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Add New Skill Form */}
                        <div className="w-full md:w-72 shrink-0 border-t md:border-t-0 md:border-l border-stone-200 pt-6 md:pt-0 md:pl-8">
                            <p className="text-sm font-semibold text-stone-500 mb-4">
                                ADD A SKILL
                            </p>
                            <form
                                onSubmit={handleAddSkill}
                                className="flex flex-col gap-3"
                            >
                                <Input
                                    placeholder="e.g. Carpenter"
                                    value={newSkill}
                                    onChange={(e) =>
                                        setNewSkill(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    disabled={
                                        isUpdatingSkills || !newSkill.trim()
                                    }
                                    className="flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-3 rounded-xl font-semibold hover:bg-stone-800 disabled:bg-stone-400 transition-colors shadow-sm"
                                >
                                    {isUpdatingSkills ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" /> Add
                                            Skill
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Update Your Location
                        </h2>

                        <LocationPicker setLocation={setLocation} />

                        <button
                            onClick={handleUpdateLocation}
                            disabled={!location || loading}
                            className="mt-4 bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Confirm Location"}
                        </button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}

export default WorkerDashboard;
