import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import {
    User,
    Phone,
    MapPin,
    Building2,
    Wrench,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

function WorkerRegister() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [skills, setSkills] = useState("");

    // UX States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !phone || !city || !area || !skills) {
            setError("Please fill in all fields to register.");
            return;
        }

        setIsLoading(true);

        try {
            const getLocation = () =>
                new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            resolve({
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                            });
                        },
                        (err) => reject(err),
                    );
                });

            const location = await getLocation(); 

            const skillArray = skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            await api.post("/workers", {
                name,
                phone,
                city,
                area,
                skills: skillArray,
                lat: location.lat,
                lng: location.lng,
            });

            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Registration failed or location denied.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Card>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-stone-900">
                        Become a Sahayak
                    </h2>
                    <p className="text-stone-500 mt-2">
                        Register your skills and start finding local work
                        instantly.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-700 animate-in fade-in">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <div>
                            <p className="text-sm font-bold">
                                Account created successfully!
                            </p>
                            <p className="text-sm mt-1 opacity-90">
                                Redirecting you to login...
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            icon={Building2}
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                            icon={MapPin}
                            placeholder="Area / Locality"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            icon={Wrench}
                            placeholder="Skills (e.g. Electrician, Plumber)"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                        />
                        <p className="text-xs text-stone-400 mt-2 ml-2">
                            Separate multiple skills with a comma.
                        </p>
                    </div>

                    <Button type="submit" disabled={isLoading} className="mt-4">
                        {isLoading
                            ? "Creating Profile..."
                            : "Register as Worker"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-stone-500 text-sm">
                    Already a worker?{" "}
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

export default WorkerRegister;
