import type { NextFunction, Request, Response } from "express";
import { auth as butterAuth } from "../lib/auth.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await butterAuth.api.getSession({
      headers: new Headers(req.headers as Record<string, string>),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }

    req.user = session.user;

    // debug logs (keep them for development purposes)
    console.log("=== DEBUG: Authenticated user ===");
    console.log("User ID: ", req.user.id);
    console.log("Email: ", req.user.email);
    console.log("Role: ", req.user.role);
    console.log("Full user: ", JSON.stringify(req.user, null, 2));

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};
