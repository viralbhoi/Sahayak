import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUserFromToken } from "../utils/auth";
import { KeyRound, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone || "";

    // Kick them back to login if they bypassed the first step
    if (!phone) {
        navigate("/login");
        return null;
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp) {
            setError("Please enter the OTP sent to your phone.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/auth/verify-otp", { phone, otp });
            const token = res.data.data.token;

            localStorage.setItem("token", token);
            const user = getUserFromToken();

            localStorage.setItem("userId", user.id);
            localStorage.setItem("role", user.role);

            // Redirect based on role
            if (user.role === "worker") {
                navigate("/dashboard/worker");
            } else {
                navigate("/dashboard/client");
            }
        } catch (err) {
            setError("Invalid or expired OTP. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Card className="p-8 md:p-10">
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Change Number
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-stone-900">
                        Verify it's you
                    </h2>
                    <p className="text-stone-500 mt-2">
                        We sent a secure code to{" "}
                        <span className="font-bold text-stone-900">
                            {phone}
                        </span>
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleVerify} className="space-y-6">
                    <Input
                        icon={KeyRound}
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center tracking-widest text-lg font-bold"
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />{" "}
                                Verifying...
                            </>
                        ) : (
                            "Verify & Secure Login"
                        )}
                    </Button>
                </form>
            </Card>
        </Layout>
    );
}

export default VerifyOtp;
