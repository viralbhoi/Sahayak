import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* NAVBAR */}
            <nav className="flex justify-between items-center bg-secondary px-10 py-6">
                <h1 className="text-2xl font-bold text-white">Sahayak</h1>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-primary text-white px-6 py-2 rounded-xl hover:scale-105 transition"
                >
                    Login
                </button>
            </nav>

            {/* HERO */}
            <section className="text-center mt-16 px-6">
                <h2 className="text-5xl font-bold text-primary leading-tight">
                    Find Work Nearby.
                    <br />
                    Hire Help Instantly.
                </h2>

                <p className="mt-6 text-gray-600 max-w-xl mx-auto">
                    Sahayak connects local skilled workers with people who need
                    reliable services — fast, simple and location-based.
                </p>

                <div className="flex justify-center gap-6 mt-10">
                    <button
                        onClick={() => navigate("/worker/register")}
                        className="bg-primary text-white px-8 py-4 rounded-2xl hover:scale-105 transition shadow-lg"
                    >
                        Work as Worker
                    </button>

                    <button
                        onClick={() => navigate("/client/register")}
                        className="bg-accent px-8 py-4 rounded-2xl hover:scale-105 transition shadow-lg"
                    >
                        Hire as Client
                    </button>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="mt-24 px-10 grid md:grid-cols-3 gap-10">
                <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-primary">
                        Post Job
                    </h3>
                    <p className="text-gray-600 mt-3">
                        Clients post job requirements and location in seconds.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-primary">
                        Smart Matching
                    </h3>
                    <p className="text-gray-600 mt-3">
                        Nearby available workers instantly see relevant jobs.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-primary">
                        Get Work Done
                    </h3>
                    <p className="text-gray-600 mt-3">
                        Track job progress until completion easily.
                    </p>
                </div>
            </section>

            {/* TRUST / STATS */}
            <section className="mt-24 text-center">
                <h3 className="text-3xl font-bold text-primary">
                    Built for Local Communities
                </h3>

                <div className="flex justify-center gap-16 mt-10">
                    <div>
                        <p className="text-4xl font-bold text-primary">500+</p>
                        <p className="text-gray-500">Workers</p>
                    </div>

                    <div>
                        <p className="text-4xl font-bold text-primary">1200+</p>
                        <p className="text-gray-500">Jobs Posted</p>
                    </div>

                    <div>
                        <p className="text-4xl font-bold text-primary">95%</p>
                        <p className="text-gray-500">Completion Rate</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-28 text-center text-gray-500 pb-10">
                © 2026 Sahayak — Empowering Local Workforce
            </footer>
        </div>
    );
}

export default Landing;
