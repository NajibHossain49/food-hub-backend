import { prisma } from "../../lib/prisma.js";

export class UserService {
  static async findAll() {
    return prisma.user.findMany();
  }

  static async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async updateProfile(id: string, data: Record<string, any>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async createProviderProfile(
    userId: string,
    payload: {
      name: string;
      description?: string;
      address?: string;
      phone?: string;
    },
  ) {
    const profile = await prisma.providerProfile.create({
      data: {
        userId,
        name: payload.name,
        description: payload.description,
        address: payload.address,
        phone: payload.phone,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { providerProfileId: profile.id, role: "PROVIDER" },
    });

    return profile;
  }

  static async getProviderProfile(userId: string) {
    return prisma.providerProfile.findUnique({ where: { userId } });
  }
}
