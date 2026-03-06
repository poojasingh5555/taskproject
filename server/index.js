import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userroute.js";
import taskRoutes from "./routes/taskroute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});