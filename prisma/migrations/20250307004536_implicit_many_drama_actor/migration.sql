/*
  Warnings:

  - You are about to drop the `ActorsInDramas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ActorsInDramas` DROP FOREIGN KEY `ActorsInDramas_actorID_fkey`;

-- DropForeignKey
ALTER TABLE `ActorsInDramas` DROP FOREIGN KEY `ActorsInDramas_dramaID_fkey`;

-- DropTable
DROP TABLE `ActorsInDramas`;
