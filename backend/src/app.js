import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "Sahayak Backend",
    });
});

app.use("/api", routes);

export default app;
