import { Request, Response } from "express";
import { OrderService } from "./order.service.js";
import { OrderPublic } from "./order.types.js";

function toPublic(order: any): OrderPublic {
  return {
    id: order.id,
    providerId: order.providerId,
    providerName: order.provider?.name ?? "Unknown Provider",
    status: order.status,
    totalAmount: order.totalAmount,
    deliveryAddress: order.deliveryAddress,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((i: any) => ({
      mealId: i.mealId,
      name: i.meal.name,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.subtotal,
    })),
  };
}

export class OrderController {
  static async create(req: Request, res: Response) {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json(toPublic(order));
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Failed to create order" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const orders = await OrderService.getOrdersByUser(req.user.id);
      res.status(200).json(orders.map(toPublic));
    } catch {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const order = await OrderService.getOrderById(req.user.id, req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(toPublic(order));
    } catch {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  }
}
