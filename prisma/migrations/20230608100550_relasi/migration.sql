-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_foodRecipeId_fkey`;

-- DropForeignKey
ALTER TABLE `fooddetail` DROP FOREIGN KEY `FoodDetail_foodRecipeId_fkey`;

-- AlterTable
ALTER TABLE `foodrecipe` ADD COLUMN `foodDetailId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FoodRecipe` ADD CONSTRAINT `FoodRecipe_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodRecipe` ADD CONSTRAINT `FoodRecipe_foodDetailId_fkey` FOREIGN KEY (`foodDetailId`) REFERENCES `FoodDetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
