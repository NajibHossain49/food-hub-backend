import { Request, Response } from "express";
import { ProviderService } from "./provider.service.js";

export class ProviderController {
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
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
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
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
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
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
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const meal = await ProviderService.getMealById(req.params.id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.status(200).json(meal);
    } catch {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  }

  static async createMeal(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("DEBUG: req.user.id =", req.user.id);

      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });
      console.log("DEBUG: found provider profile =", profile);

      const meal = await ProviderService.createMeal(profile.id, req.body);
      res.status(201).json(meal);
    } catch (error) {
      console.error("Error creating meal:", error);
      res
        .status(500)
        .json({ message: "Failed to create meal", error: String(error) });
    }
  }

  static async updateMeal(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile) {
        return res.status(403).json({ message: "Provider profile not found" });
      }

      const updated = await ProviderService.updateMeal(
        req.params.id,
        profile.id, // ← pass providerId
        req.body,
      );

      res.status(200).json(updated);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({
        message: err.message || "Failed to update meal",
      });
    }
  }

  static async deleteMeal(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile) {
        return res.status(403).json({ message: "Provider profile not found" });
      }

      await ProviderService.deleteMeal(req.params.id, profile.id);

      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(400).json({
        message: err.message || "Failed to delete meal",
      });
    }
  }
}
