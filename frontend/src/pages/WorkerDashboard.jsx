import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

function WorkerDashboard() {
    const [worker, setWorker] = useState(null);
    const workerId = localStorage.getItem("userId");

    const fetchWorker = async () => {
        const res = await api.get(`/workers/${workerId}`);
        setWorker(res.data.data);
    };

    useEffect(() => {
        fetchWorker();
    }, []);

    const toggleAvailability = async () => {
        await api.patch(`/workers/${workerId}/availability`, {
            availability: !worker.availability,
        });

        fetchWorker();
    };

    if (!worker) return <Layout>Loading...</Layout>;

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl text-primary font-semibold mb-6 text-center">
                    Worker Dashboard
                </h2>

                <div className="space-y-2">
                    <p>
                        <strong>Name:</strong> {worker.name}
                    </p>
                    <p>
                        <strong>Phone:</strong> {worker.phone}
                    </p>
                    <p>
                        <strong>City:</strong> {worker.city}
                    </p>
                    <p>
                        <strong>Area:</strong> {worker.area}
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        {worker.availability ? "Available" : "Busy"}
                    </p>
                </div>

                <Button className="mt-6" onClick={toggleAvailability}>
                    Toggle Availability
                </Button>
            </Card>
        </Layout>
    );
}

export default WorkerDashboard;
