/*
  Warnings:

  - You are about to drop the `_EmployeeToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `orderBy` on the `Role` table. All the data in the column will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_EmployeeToRole_B_index";

-- DropIndex
DROP INDEX "_EmployeeToRole_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EmployeeToRole";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Employee" ("bio", "completed", "createdAt", "currentStep", "email", "firstName", "id", "lastName", "updatedAt") SELECT "bio", "completed", "createdAt", "currentStep", "email", "firstName", "id", "lastName", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Role" ("id", "value") SELECT "id", "value" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_value_key" ON "Role"("value");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
