import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { Phone, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function Login() {
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/request-otp", { phone });
            // Smoothly navigate to verification without an alert
            navigate("/verify", { state: { phone } });
        } catch (err) {
            setError(
                "Failed to send OTP. Please check your number and try again.",
            );
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Card className="text-center p-8 md:p-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-stone-900">
                        Welcome Back
                    </h2>
                    <p className="text-stone-500 mt-2">
                        Enter your phone number to log in or create a new
                        account.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-left animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-left">
                        <label className="block text-sm font-semibold text-stone-700 mb-2 ml-1">
                            Phone Number
                        </label>
                        <Input
                            icon={Phone}
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />{" "}
                                Sending Code...
                            </>
                        ) : (
                            <>
                                Get OTP <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </Button>
                </form>
            </Card>
        </Layout>
    );
}

export default Login;
