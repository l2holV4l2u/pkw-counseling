-- AlterTable
ALTER TABLE "User" ADD COLUMN     "studentId" TEXT;

-- CreateTable
CREATE TABLE "UniChoice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "UniChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UniChoice" ADD CONSTRAINT "UniChoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
