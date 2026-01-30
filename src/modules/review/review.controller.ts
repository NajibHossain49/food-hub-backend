import { Request, Response } from "express";
import { ReviewService } from "./review.service.js";
import { ReviewPublic } from "./review.types.js";

function toPublic(review: any): ReviewPublic {
  return {
    id: review.id,
    mealId: review.mealId,
    userId: review.userId,
    userName: review.user?.name ?? "Unknown",
    rating: review.rating,
    comment: review.comment ?? null,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
}

export class ReviewController {
  static async create(req: Request, res: Response) {
    try {
      const review = await ReviewService.createReview(req.user.id, req.body);
      res.status(201).json(toPublic(review));
    } catch (err: any) {
      res
        .status(400)
        .json({ message: err.message || "Failed to create review" });
    }
  }

  static async listByMeal(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getReviewsByMeal(req.params.mealId);
      res.status(200).json(reviews.map(toPublic));
    } catch {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }

  static async listByUser(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getUserReviews(req.user.id);
      const formatted = reviews.map((r: any) => ({
        ...toPublic(r),
        mealName: r.meal?.name ?? "Deleted Meal",
      }));
      res.status(200).json(formatted);
    } catch {
      res.status(500).json({ message: "Failed to fetch your reviews" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ReviewService.deleteReview(req.user.id, req.params.id);
      res.status(204).send();
    } catch (err: any) {
      res
        .status(400)
        .json({ message: err.message || "Failed to delete review" });
    }
  }
}
