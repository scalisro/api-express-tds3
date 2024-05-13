import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import cors from "cors";
import { config } from "./config.js";

const app = express();
console.log(`NODE_ENV=${config.NODE_ENV}`);
app.use(
  cors({
    //origin: ["http://localhost:5173", "http://192.168.1.48:5173"],
    origin: true,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRoutes);
app.use("/api/v1", taskRoutes);

export default app;