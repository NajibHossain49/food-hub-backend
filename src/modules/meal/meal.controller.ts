import { Request, Response } from "express";
import { MealService } from "./meal.service.js";
import { MealPublic } from "./meal.types.js";

function toPublic(meal: any): MealPublic {
  return {
    id: meal.id,
    name: meal.name,
    description: meal.description ?? null,
    price: meal.price,
    image: meal.image ?? null,
    category: meal.category?.name ?? null,
    providerId: meal.providerId,
    providerName: meal.provider?.name ?? "Unknown Provider",
    createdAt: meal.createdAt.toISOString(),
    updatedAt: meal.updatedAt.toISOString(),
  };
}

export class MealController {
  static async list(req: Request, res: Response) {
    try {
      const { category, minPrice, maxPrice, search } = req.query;
      const filters = {
        category: category as string | undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        search: search as string | undefined,
      };
      const meals = await MealService.getMeals(filters);
      res.status(200).json(meals.map(toPublic));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    // Guard: check if id exists
    if (!id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    try {
      const meal = await MealService.getMealById(id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.status(200).json(toPublic(meal));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  }

  static async listCategories(req: Request, res: Response) {
    try {
      const categories = await MealService.getCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }
}
