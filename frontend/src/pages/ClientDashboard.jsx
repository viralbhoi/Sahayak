import DashboardLayout from "../components/DashboardLayout";

function ClientDashboard() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-primary mb-6">
                Client Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Total Jobs</p>
                    <h2 className="text-2xl font-bold">--</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Active Jobs</p>
                    <h2 className="text-2xl font-bold">--</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Completed Jobs</p>
                    <h2 className="text-2xl font-bold">--</h2>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ClientDashboard;
