import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

function ClientDashboard() {
    const navigate = useNavigate();

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl font-semibold text-primary text-center mb-6">
                    Client Dashboard
                </h2>

                <div className="space-y-4">
                    <Button onClick={() => navigate("/jobs/create")}>
                        Create Job
                    </Button>

                    <Button onClick={() => navigate("/jobs/matches")}>
                        View Matches
                    </Button>

                    <Button onClick={() => navigate("/jobs")}>My Jobs</Button>
                </div>
            </Card>
        </Layout>
    );
}

export default ClientDashboard;
