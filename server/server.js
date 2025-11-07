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

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://mernn-blog.netlify.app", // production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // allow cookies or Authorization headers
}));

// Routes
app.use("/api/auth", authRoutes );
app.use("/api/blogs", blogRoutes)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));