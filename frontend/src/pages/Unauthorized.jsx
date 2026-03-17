import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 selection:bg-amber-100 selection:text-amber-900 px-6 text-center">
            <div className="bg-red-50 p-6 rounded-full shadow-sm border border-red-100 mb-6 text-red-600">
                <ShieldAlert className="w-12 h-12" />
            </div>

            <h1 className="text-6xl font-extrabold text-stone-900 tracking-tight mb-2">
                403
            </h1>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Access Denied
            </h2>
            <p className="text-stone-500 max-w-md mb-8 leading-relaxed">
                You do not have the required permissions to view this page. If
                you believe this is a mistake, try logging in again.
            </p>

            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-stone-800 hover:-translate-y-0.5 transition-all shadow-sm"
            >
                <Home className="w-5 h-5" /> Return to Safety
            </button>
        </div>
    );
}

export default Unauthorized;
