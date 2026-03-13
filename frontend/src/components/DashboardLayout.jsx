import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
    return (
        <div className="h-screen flex bg-background">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;
