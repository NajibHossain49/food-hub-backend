import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { UserController } from "./user.controller.js";
import { validateUpdateUser } from "./user.validation.js";

const router = express.Router();

// Public routes (we can later move them under requireAuth)
router.get("/", UserController.list);
router.get("/:id", UserController.getById);

// Protected routes (Better Auth required)
router.get("/me", requireAuth, UserController.me);
router.put(
  "/me",
  requireAuth,
  validateUpdateUser,
  UserController.updateProfile,
);
router.post(
  "/me/provider-profile",
  requireAuth,
  UserController.createProviderProfile,
);

export default router;
