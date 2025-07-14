/*
  Warnings:

  - You are about to drop the column `tpat1` on the `ALevelScore` table. All the data in the column will be lost.
  - You are about to drop the column `tpat2` on the `ALevelScore` table. All the data in the column will be lost.
  - You are about to drop the column `tpat3` on the `ALevelScore` table. All the data in the column will be lost.
  - You are about to drop the column `tpat4` on the `ALevelScore` table. All the data in the column will be lost.
  - You are about to drop the column `tpat5` on the `ALevelScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ALevelScore" DROP COLUMN "tpat1",
DROP COLUMN "tpat2",
DROP COLUMN "tpat3",
DROP COLUMN "tpat4",
DROP COLUMN "tpat5",
ADD COLUMN     "alevel61" INTEGER,
ADD COLUMN     "alevel62" INTEGER,
ADD COLUMN     "alevel63" INTEGER,
ADD COLUMN     "alevel64" INTEGER,
ADD COLUMN     "alevel65" INTEGER,
ADD COLUMN     "alevel66" INTEGER,
ADD COLUMN     "alevel70" INTEGER,
ADD COLUMN     "alevel81" INTEGER,
ADD COLUMN     "alevel82" INTEGER,
ADD COLUMN     "alevel83" INTEGER,
ADD COLUMN     "alevel84" INTEGER,
ADD COLUMN     "alevel85" INTEGER,
ADD COLUMN     "alevel86" INTEGER,
ADD COLUMN     "alevel87" INTEGER,
ADD COLUMN     "alevel88" INTEGER,
ADD COLUMN     "alevel89" INTEGER;
