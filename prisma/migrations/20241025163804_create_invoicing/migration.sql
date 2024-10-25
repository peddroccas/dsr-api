/*
  Warnings:

  - You are about to drop the column `managerId` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `managers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `managers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `managers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `manager_id` to the `completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task_id` to the `completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `managers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_managerId_fkey";

-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_taskId_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_storeId_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_userId_fkey";

-- DropIndex
DROP INDEX "managers_userId_key";

-- AlterTable
ALTER TABLE "completions" DROP COLUMN "managerId",
DROP COLUMN "taskId",
ADD COLUMN     "manager_id" INTEGER NOT NULL,
ADD COLUMN     "task_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "managers" DROP COLUMN "storeId",
DROP COLUMN "userId",
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "invoicings" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "invoicings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoicings_store_id_date_key" ON "invoicings"("store_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "managers_user_id_key" ON "managers"("user_id");

-- AddForeignKey
ALTER TABLE "invoicings" ADD CONSTRAINT "invoicings_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
