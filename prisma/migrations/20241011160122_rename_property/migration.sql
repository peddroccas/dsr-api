/*
  Warnings:

  - You are about to drop the column `deadline` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `monthly_frequency` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "deadline",
ADD COLUMN     "monthly_frequency" INTEGER NOT NULL;
