/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[auth0_sid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropIndex
DROP INDEX "User_auth0_sub_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("auth0_sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0_sid_key" ON "User"("auth0_sid");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("auth0_sub") ON DELETE RESTRICT ON UPDATE CASCADE;
