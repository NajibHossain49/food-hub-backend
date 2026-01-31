import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";

export class AdminController {
  // Users
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await AdminService.getAllUsers();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  static async updateUserStatus(req: Request, res: Response) {
    try {
      const updated = await AdminService.updateUserStatus(
        req.params.id,
        req.body.isActive,
      );
      res.status(200).json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update user status" });
    }
  }

  // Orders
  static async getOrders(req: Request, res: Response) {
    try {
      const orders = await AdminService.getAllOrders();
      res.status(200).json(orders);
    } catch {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }

  // Categories
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await AdminService.getCategories();
      res.status(200).json(categories);
    } catch {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const category = await AdminService.createCategory(req.body);
      res.status(201).json(category);
    } catch {
      res.status(400).json({ message: "Failed to create category" });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const category = await AdminService.updateCategory(
        req.params.id,
        req.body,
      );
      res.status(200).json(category);
    } catch {
      res.status(400).json({ message: "Failed to update category" });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      await AdminService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch {
      res.status(400).json({ message: "Failed to delete category" });
    }
  }
}
