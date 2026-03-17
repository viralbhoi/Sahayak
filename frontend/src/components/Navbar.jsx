import { useNavigate } from "react-router-dom";
import { Zap, LogOut } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const goDashboard = () => {
        if (role === "worker") navigate("/dashboard/worker");
        else if (role === "client") navigate("/dashboard/client");
        else navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 shadow-sm">
            {/* Brand / Logo */}
            <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={goDashboard}
            >
                <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
                    Sahayak
                </h1>
            </div>

            {/* Actions */}
            {role && (
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-red-600 bg-stone-50 hover:bg-red-50 border border-stone-200 hover:border-red-200 px-4 py-2 rounded-full transition-all duration-300"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            )}
        </nav>
    );
}

export default Navbar;
