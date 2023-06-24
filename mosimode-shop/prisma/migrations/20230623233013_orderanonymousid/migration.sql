-- AlterTable
ALTER TABLE `order` ADD COLUMN `anonymouseUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_anonymouseUserId_fkey` FOREIGN KEY (`anonymouseUserId`) REFERENCES `AnonymousUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
