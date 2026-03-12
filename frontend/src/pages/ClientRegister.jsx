import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function ClientRegister() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = async () => {
        await api.post("/clients", {
            name,
            phone,
            city,
        });

        alert("Client registered successfully");
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl font-semibold text-primary text-center mb-6">
                    Client Registration
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

                    <Button onClick={handleSubmit}>Register Client</Button>
                </div>
            </Card>
        </Layout>
    );
}

export default ClientRegister;
