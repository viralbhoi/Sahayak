import DashboardLayout from "../components/DashboardLayout";

function WorkerDashboard() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-primary mb-6">
                Worker Dashboard
            </h1>

            <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">
                    Welcome! Check available jobs from sidebar.
                </p>
            </div>
        </DashboardLayout>
    );
}

export default WorkerDashboard;
