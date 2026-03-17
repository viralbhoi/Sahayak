import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import { MapPin, CheckCircle, User, Phone, Loader2 } from "lucide-react";

function WorkerTasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/jobs/worker-assignments");
            setTasks(res.data.data);
        } catch (err) {
            console.error("Failed to fetch tasks");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const markAsCompleted = async (id) => {
        try {
            await api.patch(`/jobs/${id}/complete`);
            fetchTasks(); // Refresh list after completing
            alert("Job marked as completed!");
        } catch (err) {
            alert("Could not complete the job.");
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-stone-900">My Tasks</h2>
                <p className="text-stone-500 mt-1">
                    Manage the jobs you have accepted.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-800" />
                </div>
            ) : tasks.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center">
                    <h3 className="text-xl font-bold text-stone-900">
                        No active tasks
                    </h3>
                    <p className="text-stone-500 mt-2">
                        Go to 'Find Work' to accept some jobs!
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 capitalize mb-2">
                                    {task.skill}
                                    <span
                                        className={`ml-3 px-3 py-1 text-xs font-bold uppercase rounded-full border ${task.status === "completed" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}
                                    >
                                        {task.status}
                                    </span>
                                </h3>
                                <p className="flex items-center gap-2 text-stone-600 font-medium mb-1">
                                    <User className="w-4 h-4 text-stone-400" />{" "}
                                    Client: {task.client_name}
                                </p>
                                <p className="flex items-center gap-2 text-stone-600 font-medium mb-1">
                                    <MapPin className="w-4 h-4 text-stone-400" />{" "}
                                    {task.area}, {task.city}
                                </p>
                                <a
                                    href={`tel:${task.client_phone}`}
                                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-bold mt-2 w-fit"
                                >
                                    <Phone className="w-4 h-4" /> Call Client (
                                    {task.client_phone})
                                </a>
                            </div>

                            {task.status !== "completed" && (
                                <div className="flex items-center">
                                    <button
                                        onClick={() => markAsCompleted(task.id)}
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all w-full md:w-auto justify-center"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Mark
                                        as Done
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}

export default WorkerTasks;
