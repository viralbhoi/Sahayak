import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

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

app.use(errorHandler);

export default app;
