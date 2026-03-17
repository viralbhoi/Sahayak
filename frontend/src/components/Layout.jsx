import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-1 flex justify-center items-start pt-12 md:pt-20 px-4 pb-12">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
