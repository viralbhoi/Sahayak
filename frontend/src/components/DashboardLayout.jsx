import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
    return (
        <div className="h-screen flex bg-stone-50 font-sans overflow-hidden selection:bg-amber-100 selection:text-amber-900">
            {/* Sidebar Container */}
            <div className="hidden md:block h-full shadow-sm z-20">
                <Sidebar />
            </div>

            {/* Main Content Column */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
