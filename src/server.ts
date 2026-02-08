// import app from "./app.js";
// import config from "./config/env.config.js";
// import { prisma } from "./lib/prisma.js";

// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully");

//     app.listen(config.PORT, () => {
//       console.log(`Server is running on http://localhost:${config.PORT}`);
//       console.log(`Environment: ${config.NODE_ENV}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to the database", error);
//     process.exit(1);
//   } finally {
//     process.on("beforeExit", async () => {
//       await prisma.$disconnect();
//     });
//   }
// }

// main();

// This Code is for Vercel Deployment
import app from "./app";
export default app;
