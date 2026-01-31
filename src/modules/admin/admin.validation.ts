import { NextFunction, Request, Response } from "express";

export function validateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.body.name || typeof req.body.name !== "string") {
    return res.status(400).json({ message: "Category name is required" });
  }
  next();
}

export function validateUserStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (typeof req.body.isActive !== "boolean") {
    return res.status(400).json({ message: "isActive must be true or false" });
  }
  next();
}
