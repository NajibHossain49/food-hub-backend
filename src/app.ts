import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
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

// Configure allowed origins dynamically
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// Mount BetterAuth first
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/home", homeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
