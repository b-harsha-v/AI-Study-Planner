import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


connectDB();
app.use("/api/tasks", taskRoutes);
app.get("/",(req,res) => {res.send("Express API is running...");});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {console.log(`server running on ${PORT}`);});