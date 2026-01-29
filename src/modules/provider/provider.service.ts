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
        ...data,
        providerId,
      },
    });
  }

  static async updateMeal(id: string, data: Partial<MealInput>) {
    return prisma.meal.update({
      where: { id },
      data,
    });
  }

  static async deleteMeal(id: string) {
    return prisma.meal.delete({ where: { id } });
  }
}
