-- AlterTable
ALTER TABLE "User" ADD COLUMN     "surname" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "TGATScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tgat1" INTEGER,
    "tgat2" INTEGER,
    "tgat3" INTEGER,

    CONSTRAINT "TGATScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TPATScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tpat1" INTEGER,
    "tpat2" INTEGER,
    "tpat3" INTEGER,
    "tpat4" INTEGER,
    "tpat5" INTEGER,

    CONSTRAINT "TPATScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ALevelSubject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "score" INTEGER,

    CONSTRAINT "ALevelSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TGATScore_userId_key" ON "TGATScore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TPATScore_userId_key" ON "TPATScore"("userId");

-- AddForeignKey
ALTER TABLE "TGATScore" ADD CONSTRAINT "TGATScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TPATScore" ADD CONSTRAINT "TPATScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ALevelSubject" ADD CONSTRAINT "ALevelSubject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
