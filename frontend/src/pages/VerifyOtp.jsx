import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUserFromToken } from "../utils/auth";

function VerifyOtp() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        const res = await api.post("/auth/verify-otp", {
            phone,
            otp,
        });

        const token = res.data.data.token;

        localStorage.setItem("token", token);

        const user = getUserFromToken();

        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);

        if (user.role === "worker") {
            navigate("/dashboard/worker");
        } else {
            navigate("/dashboard/client");
        }
    };

    return (
        <Layout>
            <Card>
                <h2 className="text-2xl text-primary font-semibold text-center mb-6">
                    Verify OTP
                </h2>

                <div className="space-y-4">
                    <Input
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                        placeholder="OTP"
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <Button onClick={handleVerify}>Verify OTP</Button>
                </div>
            </Card>
        </Layout>
    );
}

export default VerifyOtp;
