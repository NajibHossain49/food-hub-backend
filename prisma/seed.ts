import { hashPassword } from "better-auth/crypto";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("🌱 Starting production seed for FoodHub...");

  const hash = async (p: string) => await hashPassword(p); // ← uses scrypt internally

  // 1. Admin user
  const adminEmail = "admin@foodhub.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: "Platform Admin",
      email: adminEmail,
      role: "ADMIN",
      isActive: true,
      image: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      accounts: {
        create: {
          id: crypto.randomUUID(),
          providerId: "credential",
          accountId: adminEmail, // ← fixed: use email
          password: await hash("SecureAdminPass123"),
        },
      },
    },
  });
  console.log("✅ Admin ready:", admin.email);

  // 2. Categories
  const categoryNames = [
    "Bangladeshi",
    "Indian",
    "Chinese",
    "Italian",
    "Fast Food",
    "Desserts",
  ];

  const categories = [];
  for (const name of categoryNames) {
    const c = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories.push(c);
  }
  console.log("✅ Categories:", categories.map((c) => c.name).join(", "));

  // 3. Providers and menus
  const providersData = [
    {
      name: "Spice Garden",
      email: "spicegarden@foodhub.com",
      description:
        "Authentic South Asian cuisine combining Bangladeshi and Indian flavors.",
      address: "Dhanmondi, Dhaka",
      phone: "01711122334",
      meals: [
        {
          name: "Butter Chicken",
          price: 390,
          category: "Indian",
          image: "https://images.unsplash.com/photo-1604908177522-402efef93f5e",
          description: "Creamy tomato-based curry with tender chicken pieces.",
        },
        {
          name: "Beef Bhuna",
          price: 420,
          category: "Bangladeshi",
          image: "https://images.unsplash.com/photo-1630467777765-58b65ef0ad1c",
          description: "Slow-cooked spiced beef with rich gravy.",
        },
      ],
    },
    {
      name: "Urban Noodles",
      email: "urbannoodles@foodhub.com",
      description: "Fusion Asian street food with authentic wok flavor.",
      address: "Banani, Dhaka",
      phone: "01712233445",
      meals: [
        {
          name: "Chicken Chow Mein",
          price: 280,
          category: "Chinese",
          image: "https://images.unsplash.com/photo-1617196034796-835f59da2f4d",
          description: "Wok-fried noodles tossed with chicken and veggies.",
        },
        {
          name: "Beef Teriyaki",
          price: 360,
          category: "Chinese",
          image: "https://images.unsplash.com/photo-1617196034796-835f59da2f4d",
          description: "Grilled beef glazed in sweet-salty teriyaki sauce.",
        },
      ],
    },
    {
      name: "Pasta Point",
      email: "pastapoint@foodhub.com",
      description:
        "Italian-inspired dishes served fresh with premium ingredients.",
      address: "Gulshan, Dhaka",
      phone: "01713334455",
      meals: [
        {
          name: "Fettuccine Alfredo",
          price: 450,
          category: "Italian",
          image: "https://images.unsplash.com/photo-1617196034796-835f59da2f4d",
          description: "Classic creamy white sauce with parmesan and butter.",
        },
        {
          name: "Margherita Pizza",
          price: 500,
          category: "Italian",
          image: "https://images.unsplash.com/photo-1601050690597-83e8b76b78b8",
          description: "Stone-baked pizza with tomato, mozzarella, and basil.",
        },
      ],
    },
  ];

  for (const p of providersData) {
    const providerUser = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        id: crypto.randomUUID(),
        name: p.name,
        email: p.email,
        role: "PROVIDER",
        isActive: true,
        image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
        accounts: {
          create: {
            id: crypto.randomUUID(),
            providerId: "credential",
            accountId: p.email, // ← fixed: use email
            password: await hash("ProviderPass123"),
          },
        },
        providerProfile: {
          create: {
            name: p.name,
            description: p.description,
            address: p.address,
            phone: p.phone,
          },
        },
      },
      include: { providerProfile: true },
    });

    for (const meal of p.meals) {
      const category = await prisma.category.findUnique({
        where: { name: meal.category },
      });
      const existingMeal = await prisma.meal.findFirst({
        where: {
          name: meal.name,
          providerId: providerUser.providerProfile!.id,
        },
      });

      if (!existingMeal) {
        await prisma.meal.create({
          data: {
            name: meal.name,
            description: meal.description,
            price: meal.price,
            image: meal.image,
            categoryId: category?.id,
            providerId: providerUser.providerProfile!.id,
          },
        });
      }
    }

    console.log(`✅ Provider seeded: ${p.name}`);
  }

  // 4. Customers
  const customers = [
    { name: "Mahmud Rahman", email: "mahmud@foodhub.com" },
    { name: "Nadia Hasan", email: "nadia@foodhub.com" },
  ];

  for (const c of customers) {
    await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        id: crypto.randomUUID(),
        name: c.name,
        email: c.email,
        role: "CUSTOMER",
        isActive: true,
        image: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
        accounts: {
          create: {
            id: crypto.randomUUID(),
            providerId: "credential",
            accountId: c.email, // ← fixed: use email
            password: await hash("CustomerPass123"),
          },
        },
      },
    });
  }
  console.log("✅ Customers seeded.");

  // 5. Orders
  const customer = await prisma.user.findUnique({
    where: { email: "mahmud@foodhub.com" },
  });
  const meals = await prisma.meal.findMany({ take: 3 });
  const providerId = meals[0].providerId;

  const order = await prisma.order.create({
    data: {
      customerId: customer!.id,
      providerId,
      status: "DELIVERED",
      deliveryAddress: "House 7, Road 5, Uttara, Dhaka",
      paymentMethod: "Cash on Delivery",
      totalAmount: meals.reduce((sum, m) => sum + m.price, 0),
      items: {
        create: meals.map((m) => ({
          mealId: m.id,
          price: m.price,
          quantity: 1,
          subtotal: m.price,
        })),
      },
    },
    include: { items: true },
  });
  console.log("✅ Sample delivered order created.");

  // 6. Reviews
  for (const item of order.items) {
    await prisma.review.create({
      data: {
        mealId: item.mealId,
        userId: customer!.id,
        rating: 5,
        comment: "Excellent taste and prompt delivery!",
      },
    });
  }
  console.log("✅ Reviews seeded.");

  console.log("🎉 Production seed completed successfully.");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
