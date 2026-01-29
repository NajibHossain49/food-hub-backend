import { prisma } from "../../lib/prisma.js";
import { MealFilter } from "./meal.types.js";

export class MealService {
  static async getMeals(filters: MealFilter) {
    const where: any = {};

    if (filters.category) {
      where.category = {
        name: { equals: filters.category, mode: "insensitive" },
      };
    }

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = Number(filters.minPrice);
      if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return prisma.meal.findMany({
      where,
      include: {
        provider: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getMealById(id: string) {
    return prisma.meal.findUnique({
      where: { id },
      include: {
        provider: true,
        category: true,
      },
    });
  }

  static async getCategories() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  }
}
