import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await api.post("/auth/request-otp", { phone });
        alert("OTP sent to your phone");
        navigate("/verify");
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl font-semibold text-center text-primary mb-6">
                    Login to Sahayak
                </h2>

                <div className="space-y-4">
                    <Input
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button onClick={handleSubmit}>Request OTP</Button>
                </div>
            </Card>
        </Layout>
    );
}

export default Login;
