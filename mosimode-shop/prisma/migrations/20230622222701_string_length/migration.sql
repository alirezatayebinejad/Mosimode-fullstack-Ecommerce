/*
  Warnings:

  - You are about to drop the column `cartId` on the `anonymoususer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `AnonymousUser_cartId_key` ON `anonymoususer`;

-- AlterTable
ALTER TABLE `anonymoususer` DROP COLUMN `cartId`;

-- AlterTable
ALTER TABLE `product` MODIFY `description` VARCHAR(250) NOT NULL;
