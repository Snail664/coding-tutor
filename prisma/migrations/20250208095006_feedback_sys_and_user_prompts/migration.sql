/*
  Warnings:

  - You are about to drop the column `promptUsed` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `systemPromptUsed` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPromptUsed` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "promptUsed",
ADD COLUMN     "systemPromptUsed" TEXT NOT NULL,
ADD COLUMN     "userPromptUsed" TEXT NOT NULL;
