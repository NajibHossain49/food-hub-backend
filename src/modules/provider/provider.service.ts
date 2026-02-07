import { prisma } from "../../lib/prisma.js";
import { MealInput, ProviderProfileInput } from "./provider.types.js";

export class ProviderService {
  // Provider profile operations
  static async getProfileByUserId(userId: string) {
    return prisma.providerProfile.findUnique({ where: { userId } });
  }

  static async updateProfile(userId: string, data: ProviderProfileInput) {
    const profile = await prisma.providerProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new Error("Provider profile not found");

    return prisma.providerProfile.update({
      where: { userId },
      data,
    });
  }

  // Meal operations
  static async getMeals(providerId: string) {
    return prisma.meal.findMany({ where: { providerId } });
  }

  static async getMealById(id: string) {
    return prisma.meal.findUnique({ where: { id } });
  }

  static async createMeal(providerId: string, data: MealInput) {
    return prisma.meal.create({
      data: {
        name: data.name,
        description: data.description ?? null, // fix: undefined → null
        price: data.price,
        image: data.image ?? null, // fix: undefined → null
        categoryId: data.categoryId,
        providerId,
      },
    });
  }

  static async updateMeal(mealId: string, providerId: string, data: any) {
    // First, verify the meal belongs to this provider
    const meal = await prisma.meal.findFirst({
      where: {
        id: mealId,
        providerId: providerId,
      },
    });

    if (!meal) {
      throw new Error("Meal not found or does not belong to this provider");
    }

    return prisma.meal.update({
      where: { id: mealId },
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        image: data.image ?? null,
        categoryId: data.categoryId,
        // isAvailable: data.isAvailable,  // uncomment if added to schema
      },
    });
  }

  static async deleteMeal(mealId: string, providerId: string) {
    const deleted = await prisma.meal.deleteMany({
      where: {
        id: mealId,
        providerId: providerId,
      },
    });

    if (deleted.count === 0) {
      throw new Error("Meal not found or does not belong to this provider");
    }

    return { deleted: true };
  }
}
