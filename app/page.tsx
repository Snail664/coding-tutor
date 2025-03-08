import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
import CodeySearch from "@/components/features/Search/CodeySearch";

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
      
      {/* Hero Section with Search - Full Screen */}
      <section className="h-screen pt-16 flex items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg mb-6">
            Coding Tutor
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Get unstuck instantly with Codey, your AI programming companion.
            Master algorithms, debug code, and learn best practices.
          </p>
          
          {/* Codey Search Integration */}
          <CodeySearch />
          
          {!session && (
            <a
              href="/api/auth/login"
              className="inline-block mt-8 bg-primary dark:bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:bg-primary/90 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              Get Started
            </a>
          )}

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-8 border-b-2 border-r-2 border-primary transform rotate-45 opacity-75"></div>
          </div>
        </div>
      </section>

      {/* Questions Section - Full Screen */}
      <section className="min-h-screen flex items-start justify-center py-24">
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar Space */}
            <div className="col-span-3"></div>
            
            {/* Questions List */}
            <div className="col-span-8">
              <FilterableQuestions questions={transformedQuestions} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
