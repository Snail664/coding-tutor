/*
  Warnings:

  - You are about to drop the column `questionId` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `questionName` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_questionId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "questionId",
ADD COLUMN     "questionName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_questionName_fkey" FOREIGN KEY ("questionName") REFERENCES "Question"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
