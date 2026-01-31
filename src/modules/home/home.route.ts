import { Router } from "express";
import { getHome, HomeController } from "./home.controller.js";

const router: Router = Router();

router.get("/home", getHome);

// Public homepage endpoints
router.get("/featured-meals", HomeController.getFeatured);
router.get("/top-providers", HomeController.getProviders);
router.get("/categories", HomeController.getCategories);
router.get("/stats", HomeController.getStats);

export default router;
