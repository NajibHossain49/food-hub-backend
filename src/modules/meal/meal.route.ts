import express from "express";
import { MealController } from "./meal.controller.js";
import { validateMealFilters } from "./meal.validation.js";

const router = express.Router();

// Public routes
router.get("/", validateMealFilters, MealController.list);
router.get("/categories", MealController.listCategories);
router.get("/:id", MealController.getById);

export default router;
