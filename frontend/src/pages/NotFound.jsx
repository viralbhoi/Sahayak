import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <h1 className="text-6xl font-bold text-primary">404</h1>

            <p className="mt-4 text-gray-600">Page not found.</p>

            <button
                onClick={() => navigate("/")}
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg"
            >
                Go Home
            </button>
        </div>
    );
}

export default NotFound;
