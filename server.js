import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import logger from "./utils/logger.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
