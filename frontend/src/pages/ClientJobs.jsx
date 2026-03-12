import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

function ClientJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const fetchJobs = async () => {
        const res = await api.get("/jobs/my-jobs");
        setJobs(res.data.data);
    };

    useEffect(() => {
        fetchJobs();

        const interval = setInterval(() => {
            fetchJobs();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const openMatches = (jobId) => {
        navigate(`/jobs/${jobId}/matches`);
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl text-primary font-semibold mb-6 text-center">
                    My Jobs
                </h2>

                <div className="space-y-4">
                    {jobs.length === 0 && (
                        <p className="text-center text-gray-500">
                            No jobs created yet
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

                            <Button
                                className="mt-3"
                                onClick={() => openMatches(job.id)}
                            >
                                View Matches
                            </Button>

                            <p>
                                <strong>Status:</strong> {job.status}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </Layout>
    );
}

export default ClientJobs;
