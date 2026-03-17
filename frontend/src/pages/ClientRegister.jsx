import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { User, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react";

function ClientRegister() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    // New UX states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !phone || !city) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/clients", { name, phone, city });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000); // Auto-redirect to login
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Card>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-stone-900">
                        Join Sahayak
                    </h2>
                    <p className="text-stone-500 mt-2">
                        Create a client account to start hiring local help.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-700">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-bold">
                            Registration successful! Redirecting to login...
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        icon={User}
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Phone}
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                        icon={MapPin}
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <Button type="submit" disabled={isLoading} className="mt-2">
                        {isLoading ? "Registering..." : "Create Account"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-stone-500 text-sm">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-amber-700 font-bold cursor-pointer hover:underline"
                    >
                        Log in here
                    </span>
                </p>
            </Card>
        </Layout>
    );
}

export default ClientRegister;
