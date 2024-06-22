/*
  Warnings:

  - You are about to drop the column `role` on the `UserRole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "role",
ADD COLUMN     "roles" TEXT[];
