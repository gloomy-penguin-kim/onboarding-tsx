import "dotenv/config"

import languages from "./data/programming-languages.json" with { type: "json" };
import roles from "./data/roles.json";

import { PrismaClient } from "../src/generated/prisma/client" 
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
export const prisma = new PrismaClient({ adapter });


async function addRoles() {
  for (const value of roles) {
    await prisma.role.upsert({
      where: { value },
      update: {},
      create: { value },
    });
  }

  console.log("Seed role data inserted");
}

async function addSkills() {
  const cleanedLanguages = [...new Set(
    languages
      .map((value) => String(value).trim())
      .filter(Boolean)
  )];

  for (const value of cleanedLanguages) {  
    await prisma.skill.upsert({
      where: { value },
      update: {},
      create: { value },
    });
  }

  console.log("Seed skill data inserted");
}

async function main() {
  await addRoles();
  await addSkills();
}

main()
  .catch((error) => {
    console.error("Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });