/*
  Warnings:

  - You are about to drop the column `is_valid` on the `completions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CompletionStatus" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "completions" DROP COLUMN "is_valid",
ADD COLUMN     "status" "CompletionStatus" NOT NULL DEFAULT 'PENDING';
