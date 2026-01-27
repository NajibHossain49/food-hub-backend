import { Request, Response, NextFunction } from "express";

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  const allowed = ["name", "phone", "avatarUrl", "image"];
  const invalid = Object.keys(req.body).filter(k => !allowed.includes(k));

  if (invalid.length > 0) {
    return res.status(400).json({ message: `Invalid fields: ${invalid.join(", ")}` });
  }
  next();
}
