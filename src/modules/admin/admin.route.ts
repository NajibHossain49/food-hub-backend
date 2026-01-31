import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { AdminController } from "./admin.controller.js";
import { validateCategory, validateUserStatus } from "./admin.validation.js";

const router = express.Router();

// Protect all admin routes
router.use(requireAuth);

// Middleware to check admin role
router.use((req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
});

// User management
router.get("/users", AdminController.getUsers);
router.patch(
  "/users/:id",
  validateUserStatus,
  AdminController.updateUserStatus,
);

// Order management
router.get("/orders", AdminController.getOrders);

// Category management
router.get("/categories", AdminController.getCategories);
router.post("/categories", validateCategory, AdminController.createCategory);
router.put("/categories/:id", validateCategory, AdminController.updateCategory);
router.delete("/categories/:id", AdminController.deleteCategory);

export default router;
