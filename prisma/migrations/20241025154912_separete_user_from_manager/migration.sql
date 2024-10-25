/*
  Warnings:

  - You are about to drop the column `userId` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `managerId` to the `completions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_store_id_fkey";

-- AlterTable
ALTER TABLE "completions" DROP COLUMN "userId",
ADD COLUMN     "managerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "store_id";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_userId_key" ON "managers"("userId");

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
