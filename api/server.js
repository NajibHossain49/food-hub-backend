// src/app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv2 from "dotenv";
import express7 from "express";

// src/modules/admin/admin.route.ts
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/config/env.config.ts
import dotenv from "dotenv";
dotenv.config();
var config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "fallback-secret-change-in-production",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:4000"
};
var env_config_default = config;

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id                String           @id\n  name              String\n  email             String           @unique\n  emailVerified     Boolean          @default(false)\n  image             String?\n  phone             String?\n  role              Role             @default(CUSTOMER)\n  avatarUrl         String?\n  isActive          Boolean          @default(true)\n  createdAt         DateTime         @default(now())\n  updatedAt         DateTime         @updatedAt\n  providerProfileId String?\n  orders            Order[]\n  providerProfile   ProviderProfile?\n  reviews           Review[]\n  accounts          Account[]\n  sessions          Session[]\n\n  @@map("user")\n}\n\nmodel ProviderProfile {\n  id          String   @id @default(uuid())\n  userId      String   @unique\n  name        String\n  description String?\n  address     String?\n  phone       String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  meals       Meal[]\n  orders      Order[]\n  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  meals     Meal[]\n}\n\nmodel Meal {\n  id          String          @id @default(uuid())\n  name        String\n  description String?\n  price       Float\n  image       String?\n  providerId  String\n  categoryId  String?\n  createdAt   DateTime        @default(now())\n  updatedAt   DateTime        @updatedAt\n  category    Category?       @relation(fields: [categoryId], references: [id])\n  provider    ProviderProfile @relation(fields: [providerId], references: [id])\n  orderItems  OrderItem[]\n  reviews     Review[]\n}\n\nmodel Order {\n  id              String          @id @default(uuid())\n  customerId      String\n  providerId      String\n  status          OrderStatus     @default(PENDING)\n  totalAmount     Float\n  deliveryAddress String\n  paymentMethod   String          @default("Cash on Delivery")\n  createdAt       DateTime        @default(now())\n  updatedAt       DateTime        @updatedAt\n  customer        User            @relation(fields: [customerId], references: [id])\n  provider        ProviderProfile @relation(fields: [providerId], references: [id])\n  items           OrderItem[]\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  mealId   String\n  orderId  String\n  quantity Int    @default(1)\n  price    Float\n  subtotal Float\n  meal     Meal   @relation(fields: [mealId], references: [id])\n  order    Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  mealId    String\n  userId    String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  meal      Meal     @relation(fields: [mealId], references: [id])\n  user      User     @relation(fields: [userId], references: [id])\n\n  @@index([mealId])\n  @@index([userId])\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  PREPARING\n  OUT_FOR_DELIVERY\n  DELIVERED\n  CANCELLED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"avatarUrl","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfileId","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"subtotal","kind":"scalar","type":"Float"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [env_config_default.CLIENT_URL],
  emailAndPassword: {
    enabled: true
  },
  events: {
    onSignIn: async ({ user }) => {
      if (!user.isActive) {
        throw new Error("Account is inactive. Contact admin.");
      }
    }
  },
  // Add these sections here (Step 2)
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  // expose role + isActive
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER",
        input: false
      },
      isActive: {
        type: "boolean",
        required: true,
        defaultValue: true,
        input: false
      }
    }
  }
});

// src/middlewares/auth.middleware.ts
var requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers)
    });
    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first"
      });
    }
    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role
    };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication"
    });
  }
};

// src/modules/admin/admin.service.ts
var AdminService = class {
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
        updatedAt: true
      }
    });
  }
  static async updateUserStatus(id, isActive) {
    return prisma.user.update({
      where: { id },
      data: { isActive }
    });
  }
  // ADD THIS MISSING METHOD
  static async updateUserRole(id, role) {
    return prisma.user.update({
      where: { id },
      data: { role }
    });
  }
  // Orders
  static async getAllOrders() {
    return prisma.order.findMany({
      include: {
        customer: { select: { id: true, name: true, email: true } },
        provider: { select: { id: true, name: true } },
        items: { include: { meal: { select: { name: true } } } }
      },
      orderBy: { createdAt: "desc" }
    });
  }
  // Categories
  static async getCategories() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  }
  static async createCategory(data) {
    return prisma.category.create({ data });
  }
  static async updateCategory(id, data) {
    return prisma.category.update({ where: { id }, data });
  }
  static async deleteCategory(id) {
    return prisma.category.delete({ where: { id } });
  }
};

// src/modules/admin/admin.controller.ts
var AdminController = class {
  // Users
  static async getUsers(req, res) {
    try {
      const users = await AdminService.getAllUsers();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }
  static async updateUserStatus(req, res) {
    const { id } = req.params;
    const { isActive } = req.body;
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
  static async updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (typeof role !== "string" || !["CUSTOMER", "PROVIDER", "ADMIN"].includes(role)) {
      return res.status(400).json({
        message: "Valid role is required (CUSTOMER, PROVIDER, ADMIN)"
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
  static async getOrders(req, res) {
    try {
      const orders = await AdminService.getAllOrders();
      res.status(200).json(orders);
    } catch {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }
  static async updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    if (typeof status !== "string" || !["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        message: "Valid status required (PENDING, PROCESSING, DELIVERED, CANCELLED)"
      });
    }
    try {
      const updated = await AdminService.updateUserStatus(id, status);
      res.status(200).json(updated);
    } catch {
      res.status(400).json({ message: "Failed to update order status" });
    }
  }
  // Categories
  static async getCategories(req, res) {
    try {
      const categories = await AdminService.getCategories();
      res.status(200).json(categories);
    } catch {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }
  static async createCategory(req, res) {
    try {
      const category = await AdminService.createCategory(req.body);
      res.status(201).json(category);
    } catch {
      res.status(400).json({ message: "Failed to create category" });
    }
  }
  static async updateCategory(req, res) {
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
  static async deleteCategory(req, res) {
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
};

// src/modules/admin/admin.validation.ts
function validateCategory(req, res, next) {
  if (!req.body.name || typeof req.body.name !== "string") {
    return res.status(400).json({ message: "Category name is required" });
  }
  next();
}
function validateUserStatus(req, res, next) {
  if (typeof req.body.isActive !== "boolean") {
    return res.status(400).json({ message: "isActive must be true or false" });
  }
  next();
}

// src/modules/admin/admin.route.ts
var router = express.Router();
router.use(requireAuth);
router.use((req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
});
router.get("/users", AdminController.getUsers);
router.patch(
  "/users/:id",
  validateUserStatus,
  AdminController.updateUserStatus
);
router.patch("/users/:id/role", AdminController.updateUserRole);
router.get("/orders", AdminController.getOrders);
router.patch("/orders/:id/status", AdminController.updateOrderStatus);
router.get("/categories", AdminController.getCategories);
router.post("/categories", validateCategory, AdminController.createCategory);
router.put("/categories/:id", validateCategory, AdminController.updateCategory);
router.delete("/categories/:id", AdminController.deleteCategory);
var admin_route_default = router;

// src/modules/home/home.route.ts
import { Router } from "express";

// src/modules/home/home.service.ts
var HomeService = class {
  static async getFeaturedMeals(limit = 6) {
    const meals = await prisma.meal.findMany({
      include: { provider: true, category: true },
      orderBy: { createdAt: "desc" },
      take: limit
    });
    return meals.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      price: m.price,
      image: m.image,
      category: m.category?.name ?? null,
      providerName: m.provider?.name ?? "Unknown Provider"
    }));
  }
  static async getTopProviders(limit = 5) {
    const providers = await prisma.providerProfile.findMany({
      include: {
        _count: {
          select: { meals: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: limit
    });
    return providers.map((p) => ({
      id: p.id,
      name: p.name,
      totalMeals: p._count.meals
    }));
  }
  static async getStats() {
    const [meals, providers, users, reviews] = await Promise.all([
      prisma.meal.count(),
      prisma.providerProfile.count(),
      prisma.user.count(),
      prisma.review.count()
    ]);
    return {
      totalMeals: meals,
      totalProviders: providers,
      totalUsers: users,
      totalReviews: reviews
    };
  }
  static async getCategories() {
    return prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  }
};

// src/modules/home/home.controller.ts
var getHome = (req, res) => {
  res.status(200).json({
    message: "Welcome to the Express TS Starter!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
var HomeController = class {
  static async getFeatured(req, res) {
    try {
      const meals = await HomeService.getFeaturedMeals();
      res.status(200).json(meals);
    } catch {
      res.status(500).json({ message: "Failed to fetch featured meals" });
    }
  }
  static async getProviders(req, res) {
    try {
      const providers = await HomeService.getTopProviders();
      res.status(200).json(providers);
    } catch {
      res.status(500).json({ message: "Failed to fetch providers" });
    }
  }
  static async getStats(req, res) {
    try {
      const stats = await HomeService.getStats();
      res.status(200).json(stats);
    } catch {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  }
  static async getCategories(req, res) {
    try {
      const categories = await HomeService.getCategories();
      res.status(200).json(categories);
    } catch {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }
};

// src/modules/home/home.route.ts
var router2 = Router();
router2.get("/home", getHome);
router2.get("/featured-meals", HomeController.getFeatured);
router2.get("/top-providers", HomeController.getProviders);
router2.get("/categories", HomeController.getCategories);
router2.get("/stats", HomeController.getStats);
var home_route_default = router2;

// src/modules/meal/meal.route.ts
import express2 from "express";

// src/modules/meal/meal.service.ts
var MealService = class {
  static async getMeals(filters) {
    const where = {};
    if (filters.category) {
      where.category = {
        name: { equals: filters.category, mode: "insensitive" }
      };
    }
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = Number(filters.minPrice);
      if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
    }
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } }
      ];
    }
    return prisma.meal.findMany({
      where,
      include: {
        provider: true,
        category: true
      },
      orderBy: { createdAt: "desc" }
    });
  }
  static async getMealById(id) {
    return prisma.meal.findUnique({
      where: { id },
      include: {
        provider: true,
        category: true
      }
    });
  }
  static async getCategories() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  }
};

// src/modules/meal/meal.controller.ts
function toPublic(meal) {
  return {
    id: meal.id,
    name: meal.name,
    description: meal.description ?? null,
    price: meal.price,
    image: meal.image ?? null,
    category: meal.category?.name ?? null,
    providerId: meal.providerId,
    providerName: meal.provider?.name ?? "Unknown Provider",
    createdAt: meal.createdAt.toISOString(),
    updatedAt: meal.updatedAt.toISOString()
  };
}
var MealController = class {
  static async list(req, res) {
    try {
      const { category, minPrice, maxPrice, search } = req.query;
      const filters = {
        category,
        minPrice: minPrice ? Number(minPrice) : void 0,
        maxPrice: maxPrice ? Number(maxPrice) : void 0,
        search
      };
      const meals = await MealService.getMeals(filters);
      res.status(200).json(meals.map(toPublic));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  }
  static async getById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }
    try {
      const meal = await MealService.getMealById(id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.status(200).json(toPublic(meal));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  }
  static async listCategories(req, res) {
    try {
      const categories = await MealService.getCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  }
};

// src/modules/meal/meal.validation.ts
function validateMealFilters(req, res, next) {
  const { minPrice, maxPrice } = req.query;
  if (minPrice && isNaN(Number(minPrice))) {
    return res.status(400).json({ message: "minPrice must be a number" });
  }
  if (maxPrice && isNaN(Number(maxPrice))) {
    return res.status(400).json({ message: "maxPrice must be a number" });
  }
  next();
}

// src/modules/meal/meal.route.ts
var router3 = express2.Router();
router3.get("/", validateMealFilters, MealController.list);
router3.get("/categories", MealController.listCategories);
router3.get("/:id", MealController.getById);
var meal_route_default = router3;

// src/modules/order/order.route.ts
import express3 from "express";

// src/modules/order/order.service.ts
var OrderService = class {
  static async createOrder(customerId, data) {
    const mealIds = data.items.map((i) => i.mealId);
    const meals = await prisma.meal.findMany({
      where: { id: { in: mealIds } },
      include: { provider: true }
    });
    if (meals.length !== data.items.length) {
      throw new Error("Some meals were not found");
    }
    if (!meals[0]) {
      throw new Error("No meals found");
    }
    const providerId = meals[0].providerId;
    const totalAmount = data.items.reduce((sum, item) => {
      const meal = meals.find((m) => m.id === item.mealId);
      if (!meal) return sum;
      return sum + meal.price * item.quantity;
    }, 0);
    const order = await prisma.order.create({
      data: {
        customerId,
        providerId,
        totalAmount,
        deliveryAddress: data.deliveryAddress,
        paymentMethod: data.paymentMethod || "Cash on Delivery",
        items: {
          create: data.items.map((i) => {
            const meal = meals.find((m) => m.id === i.mealId);
            return {
              mealId: meal.id,
              quantity: i.quantity,
              price: meal.price,
              subtotal: meal.price * i.quantity
            };
          })
        }
      },
      include: { items: { include: { meal: true } }, provider: true }
    });
    return order;
  }
  static async getOrdersByUser(customerId) {
    return prisma.order.findMany({
      where: { customerId },
      include: { items: { include: { meal: true } }, provider: true },
      orderBy: { createdAt: "desc" }
    });
  }
  static async getOrderById(customerId, id) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { meal: true } }, provider: true }
    });
    if (!order || order.customerId !== customerId) return null;
    return order;
  }
};

// src/modules/order/order.controller.ts
function toPublic2(order) {
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
    items: order.items.map((i) => ({
      mealId: i.mealId,
      name: i.meal.name,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.subtotal
    }))
  };
}
var OrderController = class {
  static async create(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json(toPublic2(order));
    } catch (err) {
      res.status(400).json({ message: err.message || "Failed to create order" });
    }
  }
  static async list(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const orders = await OrderService.getOrdersByUser(req.user.id);
      res.status(200).json(orders.map(toPublic2));
    } catch {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }
  static async getById(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      if (!req.params.id)
        return res.status(400).json({ message: "Order ID is required" });
      const order = await OrderService.getOrderById(req.user.id, req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(toPublic2(order));
    } catch {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  }
};

// src/modules/order/order.validation.ts
function validateOrder(req, res, next) {
  const { items, deliveryAddress } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "At least one item is required" });
  }
  if (!deliveryAddress) {
    return res.status(400).json({ message: "Delivery address is required" });
  }
  for (const item of items) {
    if (!item.mealId || typeof item.quantity !== "number" || item.quantity <= 0) {
      return res.status(400).json({ message: "Invalid meal item in order" });
    }
  }
  next();
}

// src/modules/order/order.route.ts
var router4 = express3.Router();
router4.use(requireAuth);
router4.post("/", validateOrder, OrderController.create);
router4.get("/", OrderController.list);
router4.get("/:id", OrderController.getById);
var order_route_default = router4;

// src/modules/provider/provider.route.ts
import express4 from "express";

// src/modules/provider/provider.service.ts
var ProviderService = class {
  // Provider profile operations
  static async getProfileByUserId(userId) {
    return prisma.providerProfile.findUnique({ where: { userId } });
  }
  static async updateProfile(userId, data) {
    const profile = await prisma.providerProfile.findUnique({
      where: { userId }
    });
    if (!profile) throw new Error("Provider profile not found");
    return prisma.providerProfile.update({
      where: { userId },
      data
    });
  }
  // Meal operations
  static async getMeals(providerId) {
    return prisma.meal.findMany({ where: { providerId } });
  }
  static async getMealById(id) {
    return prisma.meal.findUnique({ where: { id } });
  }
  static async createMeal(providerId, data) {
    return prisma.meal.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        // fix: undefined → null
        price: data.price,
        image: data.image ?? null,
        // fix: undefined → null
        categoryId: data.categoryId,
        providerId
      }
    });
  }
  static async updateMeal(mealId, providerId, data) {
    const meal = await prisma.meal.findFirst({
      where: {
        id: mealId,
        providerId
      }
    });
    if (!meal) {
      throw new Error("Meal not found or does not belong to this provider");
    }
    return prisma.meal.update({
      where: { id: mealId },
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        image: data.image ?? null,
        categoryId: data.categoryId
        // isAvailable: data.isAvailable,  // uncomment if added to schema
      }
    });
  }
  static async deleteMeal(mealId, providerId) {
    const deleted = await prisma.meal.deleteMany({
      where: {
        id: mealId,
        providerId
      }
    });
    if (deleted.count === 0) {
      throw new Error("Meal not found or does not belong to this provider");
    }
    return { deleted: true };
  }
};

// src/modules/provider/provider.controller.ts
var ProviderController = class {
  static async getProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch provider profile" });
    }
  }
  static async updateProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const updated = await ProviderService.updateProfile(
        req.user.id,
        req.body
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message || "Failed to update provider profile" });
    }
  }
  static async getMeals(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });
      const meals = await ProviderService.getMeals(profile.id);
      res.status(200).json(meals);
    } catch {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  }
  static async getMealById(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const meal = await ProviderService.getMealById(req.params.id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.status(200).json(meal);
    } catch {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  }
  static async createMeal(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("DEBUG: req.user.id =", req.user.id);
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile)
        return res.status(404).json({ message: "Provider profile not found" });
      console.log("DEBUG: found provider profile =", profile);
      const meal = await ProviderService.createMeal(profile.id, req.body);
      res.status(201).json(meal);
    } catch (error) {
      console.error("Error creating meal:", error);
      res.status(500).json({ message: "Failed to create meal", error: String(error) });
    }
  }
  static async updateMeal(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile) {
        return res.status(403).json({ message: "Provider profile not found" });
      }
      const updated = await ProviderService.updateMeal(
        req.params.id,
        profile.id,
        // ← pass providerId
        req.body
      );
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: err.message || "Failed to update meal"
      });
    }
  }
  static async deleteMeal(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!req.params.id) {
        return res.status(400).json({ message: "Meal ID is required" });
      }
      const profile = await ProviderService.getProfileByUserId(req.user.id);
      if (!profile) {
        return res.status(403).json({ message: "Provider profile not found" });
      }
      await ProviderService.deleteMeal(req.params.id, profile.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: err.message || "Failed to delete meal"
      });
    }
  }
};

// src/modules/provider/provider.validation.ts
function validateProviderProfile(req, res, next) {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Provider name is required" });
  next();
}
function validateMeal(req, res, next) {
  const { name, price } = req.body;
  if (!name || typeof price !== "number") {
    return res.status(400).json({ message: "Meal name and price are required" });
  }
  next();
}

// src/modules/provider/provider.route.ts
var router5 = express4.Router();
router5.use(requireAuth);
router5.get("/profile", ProviderController.getProfile);
router5.put(
  "/profile",
  validateProviderProfile,
  ProviderController.updateProfile
);
router5.get("/meals", ProviderController.getMeals);
router5.get("/meals/:id", ProviderController.getMealById);
router5.post("/meals", validateMeal, ProviderController.createMeal);
router5.put("/meals/:id", ProviderController.updateMeal);
router5.delete("/meals/:id", ProviderController.deleteMeal);
var provider_route_default = router5;

// src/modules/review/review.route.ts
import express5 from "express";

// src/modules/review/review.service.ts
var ReviewService = class {
  static async createReview(userId, data) {
    const hasOrdered = await prisma.orderItem.findFirst({
      where: {
        mealId: data.mealId,
        order: {
          customerId: userId,
          status: "DELIVERED"
        }
      }
    });
    if (!hasOrdered) {
      throw new Error(
        "You can only review meals you have ordered and received"
      );
    }
    const existing = await prisma.review.findFirst({
      where: {
        userId,
        mealId: data.mealId
      }
    });
    if (existing) {
      throw new Error("You have already reviewed this meal");
    }
    const review = await prisma.review.create({
      data: {
        mealId: data.mealId,
        userId,
        rating: data.rating,
        comment: data.comment ?? null
        // Convert undefined → null
      },
      include: { user: true }
    });
    return review;
  }
  static async getReviewsByMeal(mealId) {
    return prisma.review.findMany({
      where: { mealId },
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });
  }
  static async getUserReviews(userId) {
    return prisma.review.findMany({
      where: { userId },
      include: { meal: true },
      orderBy: { createdAt: "desc" }
    });
  }
  static async deleteReview(userId, id) {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review || review.userId !== userId) {
      throw new Error("Review not found or not yours");
    }
    await prisma.review.delete({ where: { id } });
    return true;
  }
};

// src/modules/review/review.controller.ts
function toPublic3(review) {
  return {
    id: review.id,
    mealId: review.mealId,
    userId: review.userId,
    userName: review.user?.name ?? "Unknown",
    rating: review.rating,
    comment: review.comment ?? null,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString()
  };
}
var ReviewController = class {
  static async create(req, res) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const review = await ReviewService.createReview(req.user.id, req.body);
      res.status(201).json(toPublic3(review));
    } catch (err) {
      res.status(400).json({ message: err.message || "Failed to create review" });
    }
  }
  static async listByMeal(req, res) {
    try {
      if (!req.params.mealId) {
        res.status(400).json({ message: "Meal ID is required" });
        return;
      }
      const reviews = await ReviewService.getReviewsByMeal(req.params.mealId);
      res.status(200).json(reviews.map(toPublic3));
    } catch {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }
  static async listByUser(req, res) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const reviews = await ReviewService.getUserReviews(req.user.id);
      const formatted = reviews.map((r) => ({
        ...toPublic3(r),
        mealName: r.meal?.name ?? "Deleted Meal"
      }));
      res.status(200).json(formatted);
    } catch {
      res.status(500).json({ message: "Failed to fetch your reviews" });
    }
  }
  static async delete(req, res) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      if (!req.params.id) {
        res.status(400).json({ message: "Review ID is required" });
        return;
      }
      await ReviewService.deleteReview(req.user.id, req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message || "Failed to delete review" });
    }
  }
};

// src/modules/review/review.validation.ts
function validateReview(req, res, next) {
  const { mealId, rating } = req.body;
  if (!mealId) {
    return res.status(400).json({ message: "mealId is required" });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "rating must be a number between 1 and 5" });
  }
  next();
}

// src/modules/review/review.route.ts
var router6 = express5.Router();
router6.get("/meal/:mealId", ReviewController.listByMeal);
router6.use(requireAuth);
router6.post("/", validateReview, ReviewController.create);
router6.get("/me", ReviewController.listByUser);
router6.delete("/:id", ReviewController.delete);
var review_route_default = router6;

// src/modules/user/user.route.ts
import express6 from "express";

// src/modules/user/user.service.ts
var UserService = class {
  static async findAll() {
    return prisma.user.findMany();
  }
  static async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
  static async updateProfile(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  }
  static async createProviderProfile(userId, payload) {
    const profile = await prisma.providerProfile.create({
      data: {
        userId,
        name: payload.name,
        description: payload.description ?? null,
        // Convert undefined → null
        address: payload.address ?? null,
        // Convert undefined → null
        phone: payload.phone ?? null
        // Convert undefined → null
      }
    });
    await prisma.user.update({
      where: { id: userId },
      data: { providerProfileId: profile.id, role: "PROVIDER" }
    });
    return profile;
  }
  static async getProviderProfile(userId) {
    return prisma.providerProfile.findUnique({ where: { userId } });
  }
};

// src/modules/user/user.controller.ts
function toPublic4(user) {
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
    providerProfileId: user.providerProfileId ?? null
  };
}
var UserController = class {
  static async list(req, res) {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users.map((u) => toPublic4(u)));
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "id is required" });
      const user = await UserService.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(toPublic4(user));
    } catch {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
  static async updateProfile(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const data = (({ name, phone, avatarUrl, image }) => ({
        name,
        phone,
        avatarUrl,
        image
      }))(req.body);
      const updated = await UserService.updateProfile(req.user.id, data);
      res.status(200).json(toPublic4(updated));
    } catch {
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
  static async createProviderProfile(req, res) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      const { name, description, address, phone } = req.body;
      if (!name) return res.status(400).json({ message: "name is required" });
      const profile = await UserService.createProviderProfile(req.user.id, {
        name,
        description,
        address,
        phone
      });
      res.status(201).json(profile);
    } catch {
      res.status(500).json({ message: "Failed to create provider profile" });
    }
  }
};

// src/modules/user/user.validation.ts
function validateUpdateUser(req, res, next) {
  const allowed = ["name", "phone", "avatarUrl", "image"];
  const invalid = Object.keys(req.body).filter((k) => !allowed.includes(k));
  if (invalid.length > 0) {
    return res.status(400).json({ message: `Invalid fields: ${invalid.join(", ")}` });
  }
  next();
}

// src/modules/user/user.route.ts
var router7 = express6.Router();
router7.get("/", requireAuth, UserController.list);
router7.get("/:id", requireAuth, UserController.getById);
router7.put(
  "/me",
  requireAuth,
  validateUpdateUser,
  UserController.updateProfile
);
router7.post(
  "/me/provider-profile",
  requireAuth,
  UserController.createProviderProfile
);
var user_route_default = router7;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
dotenv2.config();
var app = express7();
var allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(cookieParser());
app.use(express7.json());
app.use(express7.urlencoded({ extended: true }));
app.use("/api/users", user_route_default);
app.use("/api/provider", provider_route_default);
app.use("/api/meals", meal_route_default);
app.use("/api/orders", order_route_default);
app.use("/api/reviews", review_route_default);
app.use("/api/admin", admin_route_default);
app.use("/api/home", home_route_default);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    env: process.env.NODE_ENV
  });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
var app_default = app;

// src/server.ts
var server_default = app_default;
export {
  server_default as default
};
