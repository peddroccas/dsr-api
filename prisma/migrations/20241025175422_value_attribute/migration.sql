/*
  Warnings:

  - Added the required column `value` to the `invoicings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `losses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoicings" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "losses" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
