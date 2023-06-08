/*
  Warnings:

  - You are about to drop the column `foodRecipeId` on the `fooddetail` table. All the data in the column will be lost.
  - You are about to drop the column `foodDetailId` on the `foodrecipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `foodrecipe` DROP FOREIGN KEY `FoodRecipe_foodDetailId_fkey`;

-- AlterTable
ALTER TABLE `fooddetail` DROP COLUMN `foodRecipeId`;

-- AlterTable
ALTER TABLE `foodrecipe` DROP COLUMN `foodDetailId`;
