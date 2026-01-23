import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10, // max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Optional: log when a client connects
pool.on("connect", () => {
    console.log("🟢 PostgreSQL pool connected");
});

// Optional: log unexpected errors
pool.on("error", (err) => {
    console.error("🔴 Unexpected PG error", err);
    process.exit(1);
});

export default pool;
