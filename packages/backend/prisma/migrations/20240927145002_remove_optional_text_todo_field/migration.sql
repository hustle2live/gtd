/*
  Warnings:

  - Made the column `text` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "text" SET NOT NULL;
