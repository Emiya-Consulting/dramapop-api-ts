-- CreateTable
CREATE TABLE `Drama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `averageRating` DOUBLE NULL,
    `thumbnailURL` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `countryOfOrigin` VARCHAR(191) NULL,
    `seasons` INTEGER NULL,
    `episodes` INTEGER NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedOn` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Drama_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `thumbnailURL` VARCHAR(191) NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedOn` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActorsInDramas` (
    `dramaID` INTEGER NOT NULL,
    `actorID` INTEGER NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedOn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`dramaID`, `actorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActorToDrama` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ActorToDrama_AB_unique`(`A`, `B`),
    INDEX `_ActorToDrama_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActorsInDramas` ADD CONSTRAINT `ActorsInDramas_dramaID_fkey` FOREIGN KEY (`dramaID`) REFERENCES `Drama`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActorsInDramas` ADD CONSTRAINT `ActorsInDramas_actorID_fkey` FOREIGN KEY (`actorID`) REFERENCES `Actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToDrama` ADD CONSTRAINT `_ActorToDrama_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToDrama` ADD CONSTRAINT `_ActorToDrama_B_fkey` FOREIGN KEY (`B`) REFERENCES `Drama`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
