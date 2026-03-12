import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const goDashboard = () => {
        if (role === "worker") {
            navigate("/dashboard/worker");
        } else if (role === "client") {
            navigate("/dashboard/client");
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow">
            <h1
                className="text-xl font-semibold cursor-pointer"
                onClick={goDashboard}
            >
                Sahayak
            </h1>

            {role && (
                <button
                    onClick={logout}
                    className="bg-secondary px-4 py-1 rounded"
                >
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;
