// TODO: come up with a better long term solution for updating question data into the database
// run the below command to seed the database
//  ts-node --files --project tsconfig.seed.json prisma/seed.ts

import { LanguageName, PrismaClient } from "@prisma/client";
import { QUESTIONS } from "../lib/constants.seed";

const prisma = new PrismaClient();

async function main() {
  // delete all existing data in the correct order
  await prisma.templateCode.deleteMany({});
  await prisma.testCase.deleteMany({});
  await prisma.feedback.deleteMany({}); // delete feedback before questions
  await prisma.tag.deleteMany({});
  await prisma.question.deleteMany({});

  // seed the database
  for (const questionData of QUESTIONS) {
    const existingQuestion = await prisma.question.findUnique({
      where: { name: questionData.name },
    });

    if (existingQuestion) {
      console.log(`Updating existing record for ${questionData.name}`);
    } else {
      console.log(`Creating new record for ${questionData.name}`);
    }

    const questionDetails = {
      name: questionData.name,
      difficulty: questionData.difficulty,
      content: questionData.content.replace(/\\n/g, "\n"),
      templateCodes: {
        create: questionData.templateCodes.map((tc) => ({
          code: tc.code,
          language: tc.language as LanguageName,
        })),
      },
      testCases: {
        create: questionData.testCases.map((tc) => ({
          input: JSON.stringify(tc.input),
          expectedOutput: JSON.stringify(tc.expectedOutput),
          description: tc.description,
        })),
      },
      tags: {
        connectOrCreate: questionData.tags.map((tag) => ({
          where: { name: tag.name },
          create: { name: tag.name },
        })),
      },
    };

    await prisma.question.upsert({
      where: { name: questionData.name },
      update: questionDetails,
      create: questionDetails,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
