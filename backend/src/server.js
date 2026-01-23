import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Verify DB connection
        await pool.query("SELECT 1");
        console.log("✅ Database connection verified");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to database:", error.message);
        process.exit(1);
    }
};

startServer();
