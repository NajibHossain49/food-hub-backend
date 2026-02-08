import { hashPassword } from "better-auth/crypto";
import crypto from "crypto";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("Starting production seed for FoodHub...");

  const hash = async (p: string) => await hashPassword(p);

  // 1. Admin user
  const adminEmail = "admin@foodhub.com";
  await prisma.user.upsert({
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
          accountId: adminEmail,
          password: await hash("SecureAdminPass123"),
        },
      },
    },
  });
  console.log("Admin ready");

  // 2. Categories (expanded)
  const categoryNames = [
    "Bangladeshi",
    "Indian",
    "Chinese",
    "Italian",
    "Fast Food",
    "Desserts",
    "Japanese",
    "Thai",
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
  console.log("Categories seeded:", categoryNames.join(", "));

  // 3. Providers and menus (more providers, more meals, real images)
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
          image:
            "https://majasrecipes.com/wp-content/uploads/2024/12/naan-with-butter-chicken.jpg",
          description: "Creamy tomato-based curry with tender chicken pieces.",
        },
        {
          name: "Beef Bhuna",
          price: 420,
          category: "Bangladeshi",
          image:
            "https://i0.wp.com/cookingcanary.com/wp-content/uploads/2021/05/beef-bhuna-serving.jpg?w=600&ssl=1",
          description: "Slow-cooked spiced beef with rich thick gravy.",
        },
        {
          name: "Chicken Biryani",
          price: 380,
          category: "Bangladeshi",
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
          description:
            "Fragrant rice layered with spiced chicken and aromatic spices.",
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
          image:
            "https://tastesbetterfromscratch.com/wp-content/uploads/2023/10/Chow-Mein-1.jpg",
          description:
            "Wok-fried noodles tossed with chicken and fresh vegetables.",
        },
        {
          name: "Beef Teriyaki",
          price: 360,
          category: "Chinese",
          image:
            "https://www.thecookingduo.com/wp-content/uploads/2024/01/Beef-Teriyaki-8.jpg",
          description:
            "Tender beef glazed in sweet-savory teriyaki sauce with veggies.",
        },
        {
          name: "Vegetable Spring Rolls",
          price: 220,
          category: "Chinese",
          image:
            "https://www.spicebangla.com/wp-content/uploads/2024/06/Spring-Roll-Recipe.jpg",
          description:
            "Crispy rolls filled with fresh vegetables and served with sauce.",
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
          image: "https://images.unsplash.com/photo-1768668053140-f589ed4bef31",
          description: "Creamy parmesan sauce with fettuccine and fresh herbs.",
        },
        {
          name: "Margherita Pizza",
          price: 500,
          category: "Italian",
          image: "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3",
          description:
            "Classic pizza with tomato, fresh mozzarella, and basil.",
        },
        {
          name: "Pepperoni Pizza",
          price: 550,
          category: "Italian",
          image:
            "https://www.eatingonadime.com/wp-content/uploads/2024/08/200KB-Hot-Honey-Pepperoni-Pizza-13.jpg",
          description:
            "Thin crust pizza loaded with pepperoni and melted cheese.",
        },
      ],
    },
    {
      name: "Sushi Haven",
      email: "sushihaven@foodhub.com",
      description: "Fresh Japanese sushi and rolls prepared daily.",
      address: "Uttara, Dhaka",
      phone: "01714455667",
      meals: [
        {
          name: "California Roll",
          price: 320,
          category: "Japanese",
          image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
          description:
            "Crab, avocado, and cucumber wrapped in seaweed and rice.",
        },
        {
          name: "Salmon Nigiri",
          price: 280,
          category: "Japanese",
          image: "https://images.unsplash.com/photo-1563612116625-3012372fccce",
          description: "Fresh salmon over seasoned sushi rice.",
        },
        {
          name: "Sushi Platter (6 pcs)",
          price: 680,
          category: "Japanese",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
          description: "Assorted nigiri and rolls for a complete experience.",
        },
      ],
    },
    {
      name: "Burger Buzz",
      email: "burgerbuzz@foodhub.com",
      description: "Juicy burgers and fast food classics.",
      address: "Mirpur, Dhaka",
      phone: "01715566778",
      meals: [
        {
          name: "Classic Cheeseburger",
          price: 250,
          category: "Fast Food",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
          description:
            "Beef patty with cheese, lettuce, tomato, and special sauce.",
        },
        {
          name: "Crispy Chicken Burger",
          price: 280,
          category: "Fast Food",
          image:
            "https://images.immediate.co.uk/production/volatile/sites/30/2025/04/Crispiest-buttermilk-fried-chicken-burgers-90854e5.jpg",
          description: "Crispy fried chicken with mayo and fresh veggies.",
        },
      ],
    },
    {
      name: "Sweet Cravings",
      email: "sweetcravings@foodhub.com",
      description: "Decadent desserts and sweet treats.",
      address: "Badda, Dhaka",
      phone: "01716677889",
      meals: [
        {
          name: "Chocolate Lava Cake",
          price: 320,
          category: "Desserts",
          image:
            "https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&",
          description: "Warm cake with molten chocolate center.",
        },
        {
          name: "Mango Cheesecake",
          price: 350,
          category: "Desserts",
          image:
            "https://takestwoeggs.com/wp-content/uploads/2021/08/No-Bake-Mango-Cheesecake-Takestwoeggs-Final-sq.jpg",
          description: "Creamy cheesecake topped with fresh mango.",
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
            accountId: p.email,
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

    console.log(`Provider seeded: ${p.name}`);
  }

  // 4. Customers (more entries)
  const customers = [
    { name: "Mahmud Rahman", email: "mahmud@foodhub.com" },
    { name: "Nadia Hasan", email: "nadia@foodhub.com" },
    { name: "Sara Ahmed", email: "sara@foodhub.com" },
    { name: "Rahim Khan", email: "rahim@foodhub.com" },
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
            accountId: c.email,
            password: await hash("CustomerPass123"),
          },
        },
      },
    });
  }
  console.log("Customers seeded.");

  // 5. Sample Orders (2 orders)
  const customerMahmud = await prisma.user.findUnique({
    where: { email: "mahmud@foodhub.com" },
  });

  const meals = await prisma.meal.findMany({ take: 6 });

  // Order 1 - Delivered
  const order1 = await prisma.order.create({
    data: {
      customerId: customerMahmud!.id,
      providerId: meals[0].providerId,
      status: "DELIVERED",
      deliveryAddress: "House 7, Road 5, Uttara, Dhaka",
      paymentMethod: "Cash on Delivery",
      totalAmount: meals[0].price + meals[1].price,
      items: {
        create: [
          {
            mealId: meals[0].id,
            price: meals[0].price,
            quantity: 1,
            subtotal: meals[0].price,
          },
          {
            mealId: meals[1].id,
            price: meals[1].price,
            quantity: 1,
            subtotal: meals[1].price,
          },
        ],
      },
    },
    include: { items: true },
  });

  // Order 2 - Pending
  const order2 = await prisma.order.create({
    data: {
      customerId: customerMahmud!.id,
      providerId: meals[3].providerId,
      status: "PENDING",
      deliveryAddress: "House 7, Road 5, Uttara, Dhaka",
      paymentMethod: "bKash",
      totalAmount: meals[3].price + meals[4].price,
      items: {
        create: [
          {
            mealId: meals[3].id,
            price: meals[3].price,
            quantity: 2,
            subtotal: meals[3].price * 2,
          },
          {
            mealId: meals[4].id,
            price: meals[4].price,
            quantity: 1,
            subtotal: meals[4].price,
          },
        ],
      },
    },
  });

  console.log("Sample orders created.");

  // 6. Reviews (more reviews)
  for (const item of order1.items) {
    await prisma.review.create({
      data: {
        mealId: item.mealId,
        userId: customerMahmud!.id,
        rating: 5,
        comment: "Excellent taste and prompt delivery!",
      },
    });
  }

  await prisma.review.create({
    data: {
      mealId: meals[3].id,
      userId: customerMahmud!.id,
      rating: 4,
      comment: "Very fresh and delicious sushi.",
    },
  });

  console.log("Reviews seeded.");
  console.log("Production seed completed successfully.");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
