import "dotenv/config"

import languages from "./data/programming-languages.json";
import roles from "./data/roles.json";

import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import path from "path"

const databasePath = path.join(process.cwd(), "prisma", "dev.db")

const adapter = new PrismaBetterSqlite3({
  url: `file:${databasePath}`,
})

const prisma = new PrismaClient({
  adapter,
})   


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