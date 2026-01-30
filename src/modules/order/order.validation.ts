import { NextFunction, Request, Response } from "express";

export function validateOrder(req: Request, res: Response, next: NextFunction) {
  const { items, deliveryAddress } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "At least one item is required" });
  }
  if (!deliveryAddress) {
    return res.status(400).json({ message: "Delivery address is required" });
  }

  for (const item of items) {
    if (
      !item.mealId ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      return res.status(400).json({ message: "Invalid meal item in order" });
    }
  }

  next();
}
