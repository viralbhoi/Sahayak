import { useNavigate } from "react-router-dom";

function Sidebar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-primary text-white p-5">
            <h2 className="text-2xl font-bold mb-8">Sahayak</h2>

            <div className="space-y-4">
                {role === "client" && (
                    <>
                        <button
                            onClick={() => navigate("/dashboard/client")}
                            className="block w-full text-left hover:bg-secondary p-2 rounded"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/jobs")}
                            className="block w-full text-left hover:bg-secondary p-2 rounded"
                        >
                            My Jobs
                        </button>

                        <button
                            onClick={() => navigate("/jobs/create")}
                            className="block w-full text-left hover:bg-secondary p-2 rounded"
                        >
                            Create Job
                        </button>
                    </>
                )}

                {role === "worker" && (
                    <>
                        <button
                            onClick={() => navigate("/dashboard/worker")}
                            className="block w-full text-left hover:bg-secondary p-2 rounded"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/worker/jobs")}
                            className="block w-full text-left hover:bg-secondary p-2 rounded"
                        >
                            Job Feed
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
