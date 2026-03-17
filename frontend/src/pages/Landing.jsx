import { useNavigate } from "react-router-dom";

import {
    Briefcase,
    UserCircle,
    MapPin,
    Zap,
    CheckCircle,
    Star,
} from "lucide-react";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 flex justify-between items-center bg-stone-50/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 md:px-12">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                        Sahayak
                    </h1>
                </div>

                <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold text-amber-900 border border-amber-200 bg-amber-50 px-5 py-2 rounded-full hover:bg-amber-800 hover:text-white transition-all duration-300 shadow-sm"
                >
                    Log In
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="relative text-center pt-24 pb-20 px-6 overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-100 bg-amber-700/10 blur-3xl rounded-full -z-10"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-sm font-semibold mb-6 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                    Now live in your city
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold text-stone-900 leading-tight tracking-tight max-w-4xl mx-auto">
                    Find Work Nearby. <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-800 to-orange-500">
                        Hire Help Instantly.
                    </span>
                </h2>

                <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                    Sahayak connects local skilled workers with people who need
                    reliable services. Fast, simple, and entirely
                    location-based.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                    <button
                        onClick={() => navigate("/client/register")}
                        className="flex items-center justify-center gap-2 bg-amber-800 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-amber-900 hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                        <UserCircle className="w-5 h-5" />
                        Hire as Client
                    </button>

                    <button
                        onClick={() => navigate("/worker/register")}
                        className="flex items-center justify-center gap-2 bg-white text-stone-800 text-lg font-semibold px-8 py-4 rounded-full border-2 border-stone-200 hover:border-amber-800 hover:text-amber-900 hover:shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                        <Briefcase className="w-5 h-5" />
                        Work as Worker
                    </button>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 bg-white px-6 md:px-12 border-y border-stone-100">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-stone-900">
                        How Sahayak Works
                    </h3>
                    <p className="text-stone-500 mt-4 text-lg">
                        Get started in three simple steps.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-800 group-hover:text-white transition-all duration-300 shadow-sm border border-amber-100">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900">
                            1. Post a Job
                        </h3>
                        <p className="text-stone-600 mt-3 leading-relaxed">
                            Clients post their specific requirements and exact
                            location in a matter of seconds.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm border border-orange-100">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900">
                            2. Smart Matching
                        </h3>
                        <p className="text-stone-600 mt-3 leading-relaxed">
                            Our algorithm instantly alerts nearby available
                            workers about relevant job postings.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm border border-emerald-100">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900">
                            3. Get Work Done
                        </h3>
                        <p className="text-stone-600 mt-3 leading-relaxed">
                            Track the job progress seamlessly from acceptance
                            right through to completion.
                        </p>
                    </div>
                </div>
            </section>

            {/* TRUST / STATS */}
            <section className="py-24 bg-stone-900 text-stone-100 px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        Built for Local Communities
                    </h3>
                    <p className="text-stone-400 mb-16 max-w-2xl mx-auto text-lg">
                        Join thousands of people who trust Sahayak to get things
                        done every single day.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 divide-x divide-stone-800">
                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-extrabold text-amber-500 mb-2">
                                500+
                            </p>
                            <p className="text-stone-400 font-medium tracking-wide uppercase text-sm">
                                Active Workers
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-extrabold text-orange-400 mb-2">
                                1.2k+
                            </p>
                            <p className="text-stone-400 font-medium tracking-wide uppercase text-sm">
                                Jobs Posted
                            </p>
                        </div>

                        <div className="flex flex-col items-center col-span-2 md:col-span-1 border-t md:border-t-0 border-stone-800 pt-10 md:pt-0">
                            <p className="text-5xl font-extrabold text-emerald-400 mb-2 flex items-center gap-2">
                                95%{" "}
                                <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
                            </p>
                            <p className="text-stone-400 font-medium tracking-wide uppercase text-sm">
                                Completion Rate
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-stone-50 border-t border-stone-200 py-10 text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="font-bold text-stone-900 text-lg">
                        Sahayak
                    </span>
                </div>
                <p className="text-stone-500 text-sm">
                    © {new Date().getFullYear()} Sahayak — Empowering Local
                    Workforce. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default Landing;
