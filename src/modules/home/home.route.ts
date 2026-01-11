import { Router } from "express";
import { getHome } from "./home.controller.js";

const router: Router = Router();

router.get("/home", getHome);

export default router;
