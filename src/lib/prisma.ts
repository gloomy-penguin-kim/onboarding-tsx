import "dotenv/config"

import { PrismaClient } from "@/generated/prisma/client" 
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
export const prisma = new PrismaClient({ adapter });

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set")
}

  
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
 
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}