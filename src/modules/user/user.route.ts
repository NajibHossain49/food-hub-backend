import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { UserController } from "./user.controller.js";
import { validateUpdateUser } from "./user.validation.js";

const router = express.Router();

// Protected routes (Better Auth required)
router.get("/", requireAuth, UserController.list);
router.get("/:id", requireAuth, UserController.getById);
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
