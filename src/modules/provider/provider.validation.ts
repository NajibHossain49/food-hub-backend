import { NextFunction, Request, Response } from "express";

export function validateProviderProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Provider name is required" });
  next();
}

export function validateMeal(req: Request, res: Response, next: NextFunction) {
  const { name, price } = req.body;
  if (!name || typeof price !== "number") {
    return res
      .status(400)
      .json({ message: "Meal name and price are required" });
  }
  next();
}
