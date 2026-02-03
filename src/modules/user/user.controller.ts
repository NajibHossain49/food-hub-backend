import { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { UserPublic } from "./user.types.js";

function toPublic(user: any): UserPublic {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image ?? null,
    avatarUrl: user.avatarUrl ?? null,
    phone: user.phone ?? null,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    providerProfileId: user.providerProfileId ?? null,
  };
}

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users.map((u) => toPublic(u)));
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(toPublic(user));
    } catch {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const data = (({ name, phone, avatarUrl, image }) => ({
        name,
        phone,
        avatarUrl,
        image,
      }))(req.body);
      const updated = await UserService.updateProfile(req.user.id, data);
      res.status(200).json(toPublic(updated));
    } catch {
      res.status(500).json({ message: "Failed to update profile" });
    }
  }

  static async createProviderProfile(req: Request, res: Response) {
    try {
      const { name, description, address, phone } = req.body;
      if (!name) return res.status(400).json({ message: "name is required" });
      const profile = await UserService.createProviderProfile(req.user.id, {
        name,
        description,
        address,
        phone,
      });
      res.status(201).json(profile);
    } catch {
      res.status(500).json({ message: "Failed to create provider profile" });
    }
  }
}
