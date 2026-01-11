import dotenv from "dotenv";

// Load .env file
dotenv.config();

interface EnvConfig {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  CLIENT_URL: string; // For CORS origin
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

const config: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  BETTER_AUTH_SECRET:
    process.env.BETTER_AUTH_SECRET || "fallback-secret-change-in-production",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
};

export default config;
