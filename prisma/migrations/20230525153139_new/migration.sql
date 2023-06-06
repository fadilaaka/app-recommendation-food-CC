/*
  Warnings:

  - You are about to drop the column `age` on the `user` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `age`,
    ADD COLUMN `birthday` DATETIME(3) NOT NULL;