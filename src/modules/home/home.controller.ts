import { Request, Response } from "express";
import { HomeService } from "./home.service.js";

export const getHome = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Welcome to the Express TS Starter!",
    timestamp: new Date().toISOString(),
  });
};
export class HomeController {
  static async getFeatured(req: Request, res: Response) {
    try {
      const meals = await HomeService.getFeaturedMeals();
      res.status(200).json(meals);
    } catch {
      res.status(500).json({ message: "Failed to fetch featured meals" });
    }
  }

  static async getProviders(req: Request, res: Response) {
    try {
      const providers = await HomeService.getTopProviders();
      res.status(200).json(providers);
    } catch {
      res.status(500).json({ message: "Failed to fetch providers" });
    }
  }

  static async getStats(req: Request, res: Response) {
    try {
      const stats = await HomeService.getStats();
      res.status(200).json(stats);
    } catch {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await HomeService.getCategories();
      res.status(200).json(categories);
    } catch {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }
}
