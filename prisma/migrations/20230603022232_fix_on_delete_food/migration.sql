-- DropForeignKey
ALTER TABLE `foodtagsonfood` DROP FOREIGN KEY `FoodTagsOnFood_foodId_fkey`;

-- AddForeignKey
ALTER TABLE `FoodTagsOnFood` ADD CONSTRAINT `FoodTagsOnFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
