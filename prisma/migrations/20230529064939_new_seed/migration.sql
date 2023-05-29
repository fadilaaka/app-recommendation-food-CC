-- CreateTable
CREATE TABLE `userDetailOnAlergy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `userDetailId` INTEGER NOT NULL,
    `allergyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `userDetailOnAlergy_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userDetailOnDiseaseHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `userDetailId` INTEGER NOT NULL,
    `diseaseHistoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `userDetailOnDiseaseHistory_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userDetailOnAlergy` ADD CONSTRAINT `userDetailOnAlergy_userDetailId_fkey` FOREIGN KEY (`userDetailId`) REFERENCES `UserDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userDetailOnAlergy` ADD CONSTRAINT `userDetailOnAlergy_allergyId_fkey` FOREIGN KEY (`allergyId`) REFERENCES `Allergy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userDetailOnDiseaseHistory` ADD CONSTRAINT `userDetailOnDiseaseHistory_userDetailId_fkey` FOREIGN KEY (`userDetailId`) REFERENCES `UserDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userDetailOnDiseaseHistory` ADD CONSTRAINT `userDetailOnDiseaseHistory_diseaseHistoryId_fkey` FOREIGN KEY (`diseaseHistoryId`) REFERENCES `DiseaseHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
