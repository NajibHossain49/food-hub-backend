import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../config/env.config.js";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [config.CLIENT_URL!],
  emailAndPassword: {
    enabled: true,
  },

  // expose role + isActive)
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true, // matches your schema (not nullable)
        defaultValue: "CUSTOMER", // fallback if needed
        input: false, // important: prevent users from sending role during signup
      },
      isActive: {
        type: "boolean",
        required: true,
        defaultValue: true,
        input: false,
      },
    },
  },
});
