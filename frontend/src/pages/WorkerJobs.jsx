import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

function WorkerJobs() {
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const res = await api.get("/jobs/worker-feed");
        setJobs(res.data.data);
    };

    useEffect(() => {
        fetchJobs();

        const interval = setInterval(() => {
            fetchJobs();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const acceptJob = async (id) => {
        await api.post(`/jobs/${id}/accept`);
        fetchJobs();
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl text-primary font-semibold mb-6 text-center">
                    Available Jobs
                </h2>

                <div className="space-y-4">
                    {jobs.length === 0 && (
                        <p className="text-center text-gray-500">
                            No jobs available
                        </p>
                    )}

                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="border rounded-lg p-4 bg-accent"
                        >
                            <p>
                                <strong>Skill:</strong> {job.skill}
                            </p>
                            <p>
                                <strong>City:</strong> {job.city}
                            </p>
                            <p>
                                <strong>Area:</strong> {job.area}
                            </p>

                            <Button className="mt-3">Contact Client</Button>

                            <Button
                                className="mt-3"
                                onClick={() => acceptJob(job.id)}
                            >
                                Accept Job
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </Layout>
    );
}

export default WorkerJobs;
