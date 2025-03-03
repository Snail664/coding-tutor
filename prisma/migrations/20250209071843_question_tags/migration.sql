-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_QuestionsOnTags" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuestionsOnTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestionsOnTags_B_index" ON "_QuestionsOnTags"("B");

-- AddForeignKey
ALTER TABLE "_QuestionsOnTags" ADD CONSTRAINT "_QuestionsOnTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsOnTags" ADD CONSTRAINT "_QuestionsOnTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
