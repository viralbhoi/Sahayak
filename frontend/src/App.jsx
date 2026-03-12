import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import WorkerRegister from "./pages/WorkerRegister";
import ClientRegister from "./pages/ClientRegister";
import ClientDashboard from "./pages/ClientDashboard";
import CreateJob from "./pages/CreateJob";
import Matches from "./pages/Matches";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkerDashboard from "./pages/WorkerDashboard";
import ClientJobs from "./pages/ClientJobs";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/verify" element={<VerifyOtp />} />
                <Route path="/worker/register" element={<WorkerRegister />} />
                <Route path="/client/register" element={<ClientRegister />} />
                <Route
                    path="/dashboard/worker"
                    element={
                        <ProtectedRoute role="worker">
                            <WorkerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/client"
                    element={
                        <ProtectedRoute role="client">
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/jobs/create"
                    element={
                        <ProtectedRoute role="client">
                            <CreateJob />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/jobs/matches"
                    element={
                        <ProtectedRoute role="client">
                            <Matches />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute role="client">
                            <ClientJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id/matches"
                    element={
                        <ProtectedRoute role="client">
                            <Matches />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
