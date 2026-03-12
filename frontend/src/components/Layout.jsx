import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="flex justify-center items-start pt-16 px-4">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
