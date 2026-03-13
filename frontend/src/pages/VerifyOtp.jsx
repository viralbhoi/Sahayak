import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUserFromToken } from "../utils/auth";

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const phone = location.state?.phone || "";

    if (!phone) {
        navigate("/login");
    }

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
                    <Input value={phone} />

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
