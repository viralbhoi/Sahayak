import { useNavigate, useLocation } from "react-router-dom";
// Make sure to run `npm install lucide-react` if you haven't yet!
import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    Search,
    Zap,
} from "lucide-react";

function Sidebar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const location = useLocation(); // We use this to get the current URL path

    // Helper function to check if a menu item is active
    const isActive = (path) => location.pathname === path;

    // Dynamic styling for our navigation buttons
    const navItemClass = (path) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium w-full text-left
        ${
            isActive(path)
                ? "bg-amber-100 text-amber-900 shadow-sm" // Active state styling
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
        } // Inactive state styling
    `;

    return (
        <div className="w-64 bg-white border-r border-stone-200 h-full flex flex-col p-4">
            {/* Brand Header */}
            <div className="flex items-center gap-2 px-2 mb-10 mt-2">
                <div className="bg-amber-800 p-1.5 rounded-lg shadow-sm">
                    <Zap className="text-white w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    Sahayak
                </h2>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 flex-1">
                {role === "client" && (
                    <>
                        <button
                            onClick={() => navigate("/dashboard/client")}
                            className={navItemClass("/dashboard/client")}
                        >
                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/jobs")}
                            className={navItemClass("/jobs")}
                        >
                            <Briefcase className="w-5 h-5" /> My Jobs
                        </button>
                        <button
                            onClick={() => navigate("/jobs/create")}
                            className={navItemClass("/jobs/create")}
                        >
                            <PlusCircle className="w-5 h-5" /> Create Job
                        </button>
                    </>
                )}

                {role === "worker" && (
                    <>
                        <button
                            onClick={() => navigate("/dashboard/worker")}
                            className={navItemClass("/dashboard/worker")}
                        >
                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/worker/jobs")}
                            className={navItemClass("/worker/jobs")}
                        >
                            <Search className="w-5 h-5" /> Find Work
                        </button>
                        <button
                            onClick={() => navigate("/worker/tasks")}
                            className={navItemClass("/worker/tasks")}
                        >
                            <CheckCircle className="w-5 h-5" /> My Tasks
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
