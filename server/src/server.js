import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB(); 

const app = express();
app.set("trust proxy", 1);

app.use(cors({
    origin:[process.env.NODE_ENV ==="development" ? "http://localhost:5173" : process.env.CLIENT_URL,  // Add more origins if needed
    ],
    credentials:true,
})); 

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// console.log("request received");
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
