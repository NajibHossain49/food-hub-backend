import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import config from "./config/env.config.js";
import homeRoutes from "./modules/home/home.route.js";

// Better Auth imports
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

// Load environment variables
dotenv.config();

const app: Application = express();

// 1. Mount Better Auth FIRST using prefix style
app.all("/api/auth/*splat", toNodeHandler(auth));

// 2. Now add other middlewares (important order!)
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. My normal routes
app.use("/api", homeRoutes);

// Health check test route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
