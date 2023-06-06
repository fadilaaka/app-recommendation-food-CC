-- DropForeignKey
ALTER TABLE `articlecategoryonarticle` DROP FOREIGN KEY `ArticleCategoryOnArticle_articleId_fkey`;

-- AddForeignKey
ALTER TABLE `ArticleCategoryOnArticle` ADD CONSTRAINT `ArticleCategoryOnArticle_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
