import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
import DynamicText from "@/app/dynamictext";
import FeaturesShowcase from "@/components/features/FeaturesShowcase";
import PricingSection from "@/components/features/PricingSection";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

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
      <section className="min-h-[370px] pt-40 flex items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-primary drop-shadow-lg mb-6">
            Ask Codey
          </h1>

          <div className="dynamic-text-container">
            <DynamicText />
          </div>
          
          {!session && (
            <div className="mt-4">
              <a
                href="/api/auth/login"
                className="inline-block bg-primary dark:bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-primary/90 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
              >
                Get Started
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Questions Section - Only visible when logged in */}
      {session && (
        <>
          <section id="questions-section" className="flex items-start justify-center py-0 -mt-3">
            <FilterableQuestions questions={transformedQuestions} />
          </section>
          <footer className="py-4">
            <ConditionalFooter forceShow={true} />
          </footer>
        </>
      )}
      
      {/* Features Showcase - for logged out users */}
      {!session && (
        <>
          <section id="features">
            <FeaturesShowcase />
          </section>
          <div id="pricing" className="flex justify-center w-full">
            <PricingSection />
          </div>
        </>
      )}
    </div>
  );
}
