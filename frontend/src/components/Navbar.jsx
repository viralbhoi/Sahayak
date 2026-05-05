import { useNavigate } from "react-router-dom";
import { LogOut, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api";

function Navbar() {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    // reusable function
    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            setNotifications(res.data.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const token = localStorage.getItem("token");
    // initial load
    useEffect(() => {
        if (!token) return;

        fetchNotifications();
    }, []);

    // polling
    useEffect(() => {
        if (!token) return;

        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const goDashboard = () => {
        if (role === "worker") navigate("/dashboard/worker");
        else if (role === "client") navigate("/dashboard/client");
        else navigate("/");
    };

    const unread = notifications.filter((n) => !n.is_read).length;

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 shadow-sm">
            {/* Logo */}
            <div className="cursor-pointer" onClick={goDashboard}>
                <h1 className="text-xl font-extrabold text-stone-900">
                    Sahayak
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    {token && (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="relative"
                        >
                            <Bell className="w-5 h-5 text-stone-700" />

                            {unread > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {unread}
                                </span>
                            )}
                        </button>
                    )}

                    {showDropdown && (
                        <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-3 z-50">
                            <h3 className="text-sm font-semibold mb-2">
                                Notifications
                            </h3>

                            {notifications.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    No notifications
                                </p>
                            )}

                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`p-2 rounded text-sm ${
                                        n.is_read
                                            ? "text-gray-500"
                                            : "font-semibold"
                                    }`}
                                >
                                    {n.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {role && (
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-red-600 bg-stone-50 hover:bg-red-50 border border-stone-200 hover:border-red-200 px-4 py-2 rounded-full transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
