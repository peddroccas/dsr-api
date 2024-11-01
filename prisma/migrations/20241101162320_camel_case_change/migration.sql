/*
  Warnings:

  - You are about to drop the column `completed_at` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `manager_id` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `task_id` on the `completions` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `invoicings` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `losses` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `managers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `managers` table. All the data in the column will be lost.
  - You are about to drop the column `weekly_frequency` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId,date]` on the table `invoicings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId,date]` on the table `losses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `managers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `invoicings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `losses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `managers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "completions" DROP CONSTRAINT "completions_task_id_fkey";

-- DropForeignKey
ALTER TABLE "invoicings" DROP CONSTRAINT "invoicings_store_id_fkey";

-- DropForeignKey
ALTER TABLE "losses" DROP CONSTRAINT "losses_store_id_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_store_id_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_user_id_fkey";

-- DropIndex
DROP INDEX "invoicings_store_id_date_key";

-- DropIndex
DROP INDEX "losses_store_id_date_key";

-- DropIndex
DROP INDEX "managers_user_id_key";

-- AlterTable
ALTER TABLE "completions" DROP COLUMN "completed_at",
DROP COLUMN "manager_id",
DROP COLUMN "task_id",
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "managerId" INTEGER NOT NULL,
ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoicings" DROP COLUMN "store_id",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "losses" DROP COLUMN "store_id",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "managers" DROP COLUMN "store_id",
DROP COLUMN "user_id",
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "weekly_frequency",
ADD COLUMN     "weeklyFrequency" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "invoicings_storeId_date_key" ON "invoicings"("storeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "losses_storeId_date_key" ON "losses"("storeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "managers_userId_key" ON "managers"("userId");

-- AddForeignKey
ALTER TABLE "invoicings" ADD CONSTRAINT "invoicings_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completions" ADD CONSTRAINT "completions_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
