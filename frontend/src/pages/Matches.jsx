import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";

function Matches() {
    const { id } = useParams();
    const [workers, setWorkers] = useState([]);

    const fetchMatches = async () => {
        const res = await api.get(`/jobs/${id}/matches`);
        setWorkers(res.data.data);
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl text-primary font-semibold mb-6 text-center">
                    Matched Workers
                </h2>

                <div className="space-y-3">
                    {workers.map((w) => (
                        <div
                            key={w.id}
                            className="border rounded-lg p-4 bg-accent"
                        >
                            <p className="font-semibold">{w.name}</p>
                            <p>{w.phone}</p>
                            <p>{w.city}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </Layout>
    );
}

export default Matches;
