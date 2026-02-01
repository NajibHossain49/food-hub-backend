import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import config from "./config/env.config.js";
import adminRoutes from "./modules/admin/admin.route.js";
import homeRoutes from "./modules/home/home.route.js";
import mealRoutes from "./modules/meal/meal.route.js";
import orderRoutes from "./modules/order/order.route.js";
import providerRoutes from "./modules/provider/provider.route.js";
import reviewRoutes from "./modules/review/review.route.js";
import userRoutes from "./modules/user/user.route.js";

// Better Auth imports
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

// Load environment variables
dotenv.config();

const app: Application = express();

// 1. Now add other middlewares (important order!)
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 2. Mount Better Auth FIRST using prefix style
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes (User Module) Public + protected user routes
app.use("/api/users", userRoutes);

// Provider routes (Provider Module) Public + protected provider routes
app.use("/api/provider", providerRoutes);

// Meal routes (Meal Module) Public meal routes
app.use("/api/meals", mealRoutes);

// Order routes (Order Module) Protected order routes
app.use("/api/orders", orderRoutes);

// Review routes (Review Module) Public + protected review routes
app.use("/api/reviews", reviewRoutes);

// Admin routes (Admin Module) Protected admin routes
app.use("/api/admin", adminRoutes);

// Home routes (Home Module) Public home routes
app.use("/api/home", homeRoutes);

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
