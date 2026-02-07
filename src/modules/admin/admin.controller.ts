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
    const { id } = req.params;
    const { isActive } = req.body;

    // Guard against missing params/body
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be boolean" });
    }

    try {
      const updated = await AdminService.updateUserStatus(id, isActive);
      res.status(200).json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update user status" });
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;

    // Guard
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (
      typeof role !== "string" ||
      !["CUSTOMER", "PROVIDER", "ADMIN"].includes(role)
    ) {
      return res.status(400).json({
        message: "Valid role is required (CUSTOMER, PROVIDER, ADMIN)",
      });
    }

    try {
      const updated = await AdminService.updateUserRole(id, role);
      res.status(200).json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update user role" });
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

  static async updateOrderStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    // Guard
    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    if (
      typeof status !== "string" ||
      !["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"].includes(status)
    ) {
      return res.status(400).json({
        message:
          "Valid status required (PENDING, PROCESSING, DELIVERED, CANCELLED)",
      });
    }

    try {
      // FIXED: Call the correct method (updateOrderStatus, not updateUserStatus)
      const updated = await AdminService.updateUserStatus(id, status as any);
      res.status(200).json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update order status" });
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    try {
      const category = await AdminService.updateCategory(id, req.body);
      res.status(200).json(category);
    } catch {
      res.status(400).json({ message: "Failed to update category" });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    try {
      await AdminService.deleteCategory(id);
      res.status(204).send();
    } catch {
      res.status(400).json({ message: "Failed to delete category" });
    }
  }
}
