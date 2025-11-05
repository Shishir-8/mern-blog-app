import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from 'cors'
import authRoutes from "./routes/authRoute.js"
import blogRoutes from "./routes/blogRoute.js"

import 'dotenv/config'

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// Routes
app.use("/api/auth", authRoutes );
app.use("/api/blogs", blogRoutes)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));