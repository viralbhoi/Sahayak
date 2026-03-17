import { useNavigate } from "react-router-dom";
import { MapPinOff, Home } from "lucide-react";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 selection:bg-amber-100 selection:text-amber-900 px-6 text-center">
            <div className="bg-white p-6 rounded-full shadow-sm border border-stone-200 mb-6">
                <MapPinOff className="w-12 h-12 text-stone-400" />
            </div>

            <h1 className="text-6xl font-extrabold text-stone-900 tracking-tight mb-2">
                404
            </h1>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Looks like you're lost.
            </h2>
            <p className="text-stone-500 max-w-md mb-8 leading-relaxed">
                The page you are looking for doesn't exist or has been moved.
                Let's get you back to finding or offering help.
            </p>

            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-amber-800 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-amber-900 hover:-translate-y-0.5 transition-all shadow-sm"
            >
                <Home className="w-5 h-5" /> Back to Home
            </button>
        </div>
    );
}

export default NotFound;
