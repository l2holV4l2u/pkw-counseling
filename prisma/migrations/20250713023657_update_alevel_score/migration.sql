/*
  Warnings:

  - You are about to drop the `ALevelSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ALevelSubject" DROP CONSTRAINT "ALevelSubject_userId_fkey";

-- DropTable
DROP TABLE "ALevelSubject";

-- CreateTable
CREATE TABLE "ALevelScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tpat1" INTEGER,
    "tpat2" INTEGER,
    "tpat3" INTEGER,
    "tpat4" INTEGER,
    "tpat5" INTEGER,

    CONSTRAINT "ALevelScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ALevelScore_userId_key" ON "ALevelScore"("userId");

-- AddForeignKey
ALTER TABLE "ALevelScore" ADD CONSTRAINT "ALevelScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
