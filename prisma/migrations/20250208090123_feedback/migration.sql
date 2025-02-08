-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('hint', 'chat', 'general');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "promptUsed" TEXT NOT NULL,
    "LLMOutput" TEXT NOT NULL,
    "feedbackType" "FeedbackType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedbackText" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("auth0_sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
