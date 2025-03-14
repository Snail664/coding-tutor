import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
// import CodeySearch from "@/components/features/Search/CodeySearch";
import DynamicText from "@/app/dynamictext";
// import ScrollButton from "@/app/components/ScrollButton";

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
    tags: (q as any).tags?.map((tag: { name: string }) => ({ name: tag.name })) || []
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar auth0User={session?.user} hideMiddle={true} />
      </div>
      
      {/* Hero Section with Search - Reduced Height */}
      <section className="h-[40vh] min-h-[400px] pt-72 flex items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent">
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

      {/* Questions Section - Adjusted to follow hero section */}
      <section id="questions-section" className="flex items-start justify-center py-5">
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar Space */}
            <div className="col-span-0 md:col-span-3"></div>
            
            {/* Questions List */}
            <div className="col-span-12 md:col-span-7 md:ml-1">
              <FilterableQuestions questions={transformedQuestions} />
            </div>

            {/* Right Sidebar Space */}
            <div className="col-span-0 md:col-span-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
