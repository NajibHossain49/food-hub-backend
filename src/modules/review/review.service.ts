import { prisma } from "../../lib/prisma.js";
import { CreateReviewInput } from "./review.types.js";

export class ReviewService {
  static async createReview(userId: string, data: CreateReviewInput) {
    // Ensure the user has an order containing this meal
    const hasOrdered = await prisma.orderItem.findFirst({
      where: {
        mealId: data.mealId,
        order: {
          customerId: userId,
          status: "DELIVERED",
        },
      },
    });

    if (!hasOrdered) {
      throw new Error(
        "You can only review meals you have ordered and received",
      );
    }

    // Check if user already reviewed this meal
    const existing = await prisma.review.findFirst({
      where: {
        userId,
        mealId: data.mealId,
      },
    });
    if (existing) {
      throw new Error("You have already reviewed this meal");
    }

    const review = await prisma.review.create({
      data: {
        mealId: data.mealId,
        userId,
        rating: data.rating,
        comment: data.comment,
      },
      include: { user: true },
    });

    return review;
  }

  static async getReviewsByMeal(mealId: string) {
    return prisma.review.findMany({
      where: { mealId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getUserReviews(userId: string) {
    return prisma.review.findMany({
      where: { userId },
      include: { meal: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async deleteReview(userId: string, id: string) {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review || review.userId !== userId) {
      throw new Error("Review not found or not yours");
    }
    await prisma.review.delete({ where: { id } });
    return true;
  }
}
