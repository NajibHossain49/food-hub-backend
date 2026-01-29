import { NextFunction, Request, Response } from "express";

export function validateMealFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { minPrice, maxPrice } = req.query;

  if (minPrice && isNaN(Number(minPrice))) {
    return res.status(400).json({ message: "minPrice must be a number" });
  }
  if (maxPrice && isNaN(Number(maxPrice))) {
    return res.status(400).json({ message: "maxPrice must be a number" });
  }

  next();
}
