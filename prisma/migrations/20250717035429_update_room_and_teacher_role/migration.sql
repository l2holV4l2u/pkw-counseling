/*
  Warnings:

  - A unique constraint covering the columns `[homeroomId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "homeroomId" TEXT,
ADD COLUMN     "roomId" TEXT,
ADD COLUMN     "schoolYear" TEXT,
ADD COLUMN     "seatNumber" INTEGER;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "roomNo" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_grade_roomNo_key" ON "Room"("grade", "roomNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_homeroomId_key" ON "User"("homeroomId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeroomId_fkey" FOREIGN KEY ("homeroomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
