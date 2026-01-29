import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { ProviderController } from "./provider.controller.js";
import {
  validateMeal,
  validateProviderProfile,
} from "./provider.validation.js";

const router = express.Router();

// All routes require authentication (providers only)
router.use(requireAuth);

// Provider profile
router.get("/profile", ProviderController.getProfile);
router.put(
  "/profile",
  validateProviderProfile,
  ProviderController.updateProfile,
);

// Meals
router.get("/meals", ProviderController.getMeals);
router.get("/meals/:id", ProviderController.getMealById);
router.post("/meals", validateMeal, ProviderController.createMeal);
router.put("/meals/:id", ProviderController.updateMeal);
router.delete("/meals/:id", ProviderController.deleteMeal);

export default router;
