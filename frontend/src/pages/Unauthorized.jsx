import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <h1 className="text-6xl font-bold text-primary">403</h1>

            <p className="mt-4 text-gray-600">
                You are not authorized to view this page.
            </p>

            <button
                onClick={() => navigate("/")}
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg"
            >
                Go Home
            </button>
        </div>
    );
}

export default Unauthorized;
