-- AlterTable
ALTER TABLE `food` ADD COLUMN `foodDetailId` INTEGER NULL;

-- AlterTable
ALTER TABLE `foodrecipe` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `foodtags` MODIFY `description` LONGTEXT NULL;
