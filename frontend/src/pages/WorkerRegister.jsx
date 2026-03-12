import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function WorkerRegister() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [skills, setSkills] = useState("");

    const handleSubmit = async () => {
        const skillArray = skills.split(",").map((s) => s.trim());

        await api.post("/workers", {
            name,
            phone,
            city,
            area,
            skills: skillArray,
        });

        alert("Worker registered successfully");
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl font-semibold text-primary text-center mb-6">
                    Worker Registration
                </h2>

                <div className="space-y-4">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        placeholder="Skills (e.g. electrician, plumber)"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <Button onClick={handleSubmit}>Register Worker</Button>
                </div>
            </Card>
        </Layout>
    );
}

export default WorkerRegister;
