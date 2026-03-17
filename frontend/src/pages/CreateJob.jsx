import { useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function CreateJob() {
    const [skill, setSkill] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        const res = await api.post("/jobs", {
            
            skill,
            city,
            area,
            description,
        });

        localStorage.setItem("lastJobId", res.data.data.jobId);

        alert("Job created successfully");
    };

    return (
        <DashboardLayout>
            <Card>
                <h2 className="text-2xl font-semibold text-primary text-center mb-6">
                    Create Job
                </h2>

                <div className="space-y-4">
                    <Input
                        placeholder="Required Skill (e.g electrician)"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    />

                    <Input
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <Input
                        placeholder="Area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />

                    <Input
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button onClick={handleSubmit}>Post Job</Button>
                </div>
            </Card>
        </DashboardLayout>
    );
}

export default CreateJob;
