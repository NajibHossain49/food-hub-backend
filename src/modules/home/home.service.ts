import { prisma } from "../../lib/prisma.js";

export class HomeService {
  static async getFeaturedMeals(limit = 6) {
    const meals = await prisma.meal.findMany({
      include: { provider: true, category: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return meals.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      price: m.price,
      image: m.image,
      category: m.category?.name ?? null,
      providerName: m.provider?.name ?? "Unknown Provider",
    }));
  }

  static async getTopProviders(limit = 5) {
    const providers = await prisma.providerProfile.findMany({
      include: {
        _count: {
          select: { meals: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return providers.map((p) => ({
      id: p.id,
      name: p.name,
      totalMeals: p._count.meals,
    }));
  }

  static async getStats(): Promise<{
    totalMeals: number;
    totalProviders: number;
    totalUsers: number;
    totalReviews: number;
  }> {
    const [meals, providers, users, reviews] = await Promise.all([
      prisma.meal.count(),
      prisma.providerProfile.count(),
      prisma.user.count(),
      prisma.review.count(),
    ]);

    return {
      totalMeals: meals,
      totalProviders: providers,
      totalUsers: users,
      totalReviews: reviews,
    };
  }

  static async getCategories() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }
}
