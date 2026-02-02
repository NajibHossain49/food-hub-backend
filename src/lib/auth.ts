import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../config/env.config.js";
import { prisma } from "./prisma.js";

// Required: Better Auth instance
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

// Required: Helper to get current user with my custom fields
export async function getCurrentUser() {
  const session = await auth.api.getSession();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      phone: true,
      role: true,
      image: true,
      avatarUrl: true,
      isActive: true,
      createdAt: true,

      providerProfile: {
        select: {
          id: true,
          name: true,
          description: true,
          address: true,
          phone: true,
        },
      },
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  return user;
}
