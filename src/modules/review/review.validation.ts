import { NextFunction, Request, Response } from "express";

export function validateReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { mealId, rating } = req.body;

  if (!mealId) {
    return res.status(400).json({ message: "mealId is required" });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ message: "rating must be a number between 1 and 5" });
  }

  next();
}
