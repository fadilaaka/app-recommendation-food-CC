/*
  Warnings:

  - You are about to alter the column `token` on the `usertokenresetpassword` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `usertokenresetpassword` MODIFY `token` INTEGER NOT NULL;
