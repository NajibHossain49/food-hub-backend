import { Request, Response } from "express";
import { ProviderService } from "./provider.service.js";

export class ProviderController {
  static async getProfile(req: Request, res: Response) {
    try {
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch provider profile" });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const updated = await ProviderService.updateProfile(
        req.user.id,
        req.body,
      );
      res.status(200).json(updated);
    } catch (err: any) {
      res
        .status(400)
        .json({ message: err.message || "Failed to update provider profile" });
    }
  }

  static async getMeals(req: Request, res: Response) {
    try {
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });

      const meals = await ProviderService.getMeals(profile.id);
      res.status(200).json(meals);
    } catch {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  }

  static async getMealById(req: Request, res: Response) {
    try {
      const meal = await ProviderService.getMealById(req.params.id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.status(200).json(meal);
    } catch {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  }

  static async createMeal(req: Request, res: Response) {
    try {
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });

      const meal = await ProviderService.createMeal(profile.id, req.body);
      res.status(201).json(meal);
    } catch {
      res.status(500).json({ message: "Failed to create meal" });
    }
  }

  static async updateMeal(req: Request, res: Response) {
    try {
      const updated = await ProviderService.updateMeal(req.params.id, req.body);
      res.status(200).json(updated);
    } catch {
      res.status(500).json({ message: "Failed to update meal" });
    }
  }

  static async deleteMeal(req: Request, res: Response) {
    try {
      await ProviderService.deleteMeal(req.params.id);
      res.status(204).send();
    } catch {
      res.status(500).json({ message: "Failed to delete meal" });
    }
  }
}
