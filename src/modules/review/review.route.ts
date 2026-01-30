import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { ReviewController } from "./review.controller.js";
import { validateReview } from "./review.validation.js";

const router = express.Router();

// Public route: get all reviews for a meal
router.get("/meal/:mealId", ReviewController.listByMeal);

// Protected routes
router.use(requireAuth);
router.post("/", validateReview, ReviewController.create);
router.get("/me", ReviewController.listByUser);
router.delete("/:id", ReviewController.delete);

export default router;
