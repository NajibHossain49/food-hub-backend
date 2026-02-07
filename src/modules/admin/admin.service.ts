import { prisma } from "../../lib/prisma.js";
import { CategoryInput } from "./admin.types.js";

export class AdminService {
  // Users
  static async getAllUsers() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async updateUserStatus(id: string, isActive: boolean) {
    return prisma.user.update({
      where: { id },
      data: { isActive },
    });
  }

  // ADD THIS MISSING METHOD
  static async updateUserRole(id: string, role: string) {
    return prisma.user.update({
      where: { id },
      data: { role: role as "CUSTOMER" | "PROVIDER" | "ADMIN" },
    });
  }

  // Orders
  static async getAllOrders() {
    return prisma.order.findMany({
      include: {
        customer: { select: { id: true, name: true, email: true } },
        provider: { select: { id: true, name: true } },
        items: { include: { meal: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Categories
  static async getCategories() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  static async createCategory(data: CategoryInput) {
    return prisma.category.create({ data });
  }

  static async updateCategory(id: string, data: CategoryInput) {
    return prisma.category.update({ where: { id }, data });
  }

  static async deleteCategory(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}
