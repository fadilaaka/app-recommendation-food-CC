/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `userTokenResetPassword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `userTokenResetPassword_token_key` ON `userTokenResetPassword`(`token`);
