-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_foodRecipeId_fkey`;

-- DropForeignKey
ALTER TABLE `fooddetail` DROP FOREIGN KEY `FoodDetail_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `fooddetail` DROP FOREIGN KEY `FoodDetail_foodRecipeId_fkey`;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_foodRecipeId_fkey` FOREIGN KEY (`foodRecipeId`) REFERENCES `FoodRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodDetail` ADD CONSTRAINT `FoodDetail_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodDetail` ADD CONSTRAINT `FoodDetail_foodRecipeId_fkey` FOREIGN KEY (`foodRecipeId`) REFERENCES `FoodRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
