import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../config/env.config.js";
import { prisma } from "./prisma.js";

// Define the expected shape of the user object in the event handler
interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  isActive: boolean;
  // Add other fields if needed
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [config.CLIENT_URL!],

  emailAndPassword: {
    enabled: true,
  },

  events: {
    onSignIn: async ({ user }: { user: AuthUser }) => {
      if (!user.isActive) {
        throw new Error("Account is inactive. Contact admin.");
      }
      // Optional: other sign-in logic
    },
  },

  // expose role + isActive
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER",
        input: false,
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

// Required: Helper to get current user with custom fields
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
