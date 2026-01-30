import { prisma } from "../../lib/prisma.js";
import { CreateOrderInput } from "./order.types.js";

export class OrderService {
  static async createOrder(customerId: string, data: CreateOrderInput) {
    // Fetch all meal info and calculate totals
    const mealIds = data.items.map((i) => i.mealId);
    const meals = await prisma.meal.findMany({
      where: { id: { in: mealIds } },
      include: { provider: true },
    });

    if (meals.length !== data.items.length) {
      throw new Error("Some meals were not found");
    }

    // Assume all meals belong to the same provider
    if (!meals[0]) {
      throw new Error("No meals found");
    }
    const providerId = meals[0].providerId;
    const totalAmount = data.items.reduce((sum, item) => {
      const meal = meals.find((m) => m.id === item.mealId);
      if (!meal) return sum;
      return sum + meal.price * item.quantity;
    }, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerId,
        providerId,
        totalAmount,
        deliveryAddress: data.deliveryAddress,
        paymentMethod: data.paymentMethod || "Cash on Delivery",
        items: {
          create: data.items.map((i) => {
            const meal = meals.find((m) => m.id === i.mealId)!;
            return {
              mealId: meal.id,
              quantity: i.quantity,
              price: meal.price,
              subtotal: meal.price * i.quantity,
            };
          }),
        },
      },
      include: { items: { include: { meal: true } }, provider: true },
    });

    return order;
  }

  static async getOrdersByUser(customerId: string) {
    return prisma.order.findMany({
      where: { customerId },
      include: { items: { include: { meal: true } }, provider: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getOrderById(customerId: string, id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { meal: true } }, provider: true },
    });
    if (!order || order.customerId !== customerId) return null;
    return order;
  }
}
