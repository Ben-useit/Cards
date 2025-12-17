/*
  Warnings:

  - A unique constraint covering the columns `[activeLanguageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeLanguageId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "User_activeLanguageId_key" ON "User"("activeLanguageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeLanguageId_fkey" FOREIGN KEY ("activeLanguageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
