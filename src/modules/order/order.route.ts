import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { OrderController } from "./order.controller.js";
import { validateOrder } from "./order.validation.js";

const router = express.Router();

// All order routes require authentication
router.use(requireAuth);

router.post("/", validateOrder, OrderController.create);
router.get("/", OrderController.list);
router.get("/:id", OrderController.getById);

export default router;
