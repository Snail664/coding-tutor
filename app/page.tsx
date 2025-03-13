import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
import CodeySearch from "@/components/features/Search/CodeySearch";
import DynamicText from "@/app/dynamictext";
import ScrollButton from "@/app/components/ScrollButton";

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
            Ask Codey
          </h1>

          <DynamicText />

          {/* <p className="text-xl text-muted-foreground mb-12">
            Level up your coding skills with Codey the AI Tutor! 🚀  <br></br>
            No more sifting through StackOverflow forums or cookie-cutter chatbots!  <br></br>
            Get step-by-step guidance through problems while making you think and learn independently!
          </p> */}
          
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
          <ScrollButton />
        </div>
      </section>

      {/* Questions Section - Full Screen */}
      <section id="questions-section" className="min-h-screen flex items-start justify-center py-24">
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
