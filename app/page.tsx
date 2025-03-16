import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
import DynamicText from "@/app/dynamictext";
import FeaturesShowcase from "@/components/features/FeaturesShowcase";
import PricingSection from "@/components/features/PricingSection";

interface Question {
  name: string;
  difficulty: string;
  tags?: { name: string }[];
}

export default async function Page() {
  const session = await getSession();
  const questions = await prisma.question.findMany({
    include: {
      tags: {
        select: {
          name: true
        }
      }
    },
    cacheStrategy: { ttl: 3600, swr: 30 },
  });

  const transformedQuestions = questions.map(q => ({
    name: q.name,
    difficulty: q.difficulty,
    tags: (q as Question).tags?.map((tag: { name: string }) => ({ name: tag.name })) || []
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <section className="min-h-[400px] pt-50 flex items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-primary drop-shadow-lg mb-4">
            Ask Codey
          </h1>

          <DynamicText />
          
          {!session && (
            <a
              href="/api/auth/login"
              className="inline-block mt-6 bg-primary dark:bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-primary/90 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              Get Started
            </a>
          )}
        </div>
      </section>

      {/* Questions Section - Only visible when logged in */}
      {session && (
        <section id="questions-section" className="flex items-start justify-center py-5">
          <div className="flex items-start justify-center">
            <FilterableQuestions questions={transformedQuestions} />
          </div>
        </section>
      )}
      
      {/* Features Showcase - for logged out users - hover:scale-105*/}
      {!session && (
        <>
          <FeaturesShowcase />
          <div id="pricing">
            <PricingSection />
          </div>
        </>
      )}
      
      <footer className="py-6">
        <p className="text-center text-sm text-gray-500">Some Questions adapted from <a className="underline text-blue-500" href="https://codingquest.io" target="_blank">Coding Quest</a></p>
      </footer>
    </div>
  );
}
