import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import googleRoutes from "./routes/google.routes.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth/google", googleRoutes);
app.get("/",(req,res) => {res.send("Express API is running...");});





const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {console.log(`server running on ${PORT}`);});