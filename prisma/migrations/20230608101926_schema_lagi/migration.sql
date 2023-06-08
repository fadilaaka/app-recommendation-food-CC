/*
  Warnings:

  - You are about to drop the column `foodRecipeId` on the `food` table. All the data in the column will be lost.
  - You are about to drop the column `foodTagsId` on the `food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_foodTagsId_fkey`;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `foodRecipeId`,
    DROP COLUMN `foodTagsId`;
