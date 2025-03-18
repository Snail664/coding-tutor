import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/lib/prisma";
import FilterableQuestions from "@/components/features/Question/FilterableQuestions";
import DynamicText from "@/app/dynamictext";
import FeaturesShowcase from "@/components/features/FeaturesShowcase";
import PricingSection from "@/components/features/PricingSection";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { Github } from "lucide-react";
import Link from "next/link";

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
          name: true,
        },
      },
    },
    cacheStrategy: { ttl: 3600, swr: 30 },
  });

  const transformedQuestions = questions.map((q) => ({
    name: q.name,
    difficulty: q.difficulty,
    tags:
      (q as Question).tags?.map((tag: { name: string }) => ({
        name: tag.name,
      })) || [],
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <section className="min-h-[370px] pt-30 flex items-center justify-center relative bg-gradient-to-b from-primary/5 to-transparent border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-primary drop-shadow-lg mb-6">
            Ask Codey
          </h1>

          <div className="dynamic-text-container">
            <DynamicText />
          </div>
          
          {!session && (
            <div className="mt-4 pb-8">
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
          <section id="questions-section" className="py-12 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-center">
              <FilterableQuestions questions={transformedQuestions} />
            </div>
          </section>
          <footer className="py-4">
            <ConditionalFooter forceShow={true} />
          </footer>
        </>
      )}
      
      {/* Features Showcase - for logged out users */}
      {!session && (
        <>
          <section id="features" className="border-b border-gray-200 dark:border-gray-800">
            <FeaturesShowcase />
          </section>
          <section id="pricing" className="border-b border-gray-200 dark:border-gray-800">
            <PricingSection />
          </section>
        </>
      )}
      
      {/* Main Footer */}
      <footer className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand Logo and Slogan */}
            <div>
              <Link href="/" className="flex items-center gap-1 mb-4">
                <span className="bg-primary dark:bg-white text-white dark:text-black px-2 py-1 rounded h-8 w-8 flex items-center justify-center">C</span>
                <span className="font-bold text-xl">odeyAI</span>
              </Link>
              <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                Your next-gen AI-powered coding mentor, guiding you step by step to mastery—<strong> anytime, anywhere. </strong>
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              </ul>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Documentation</a></li>
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Pricing</a></li>
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">FAQ</a></li>
                <li><a className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section with Copyright and Social Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} CodeyAI - All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary text-gray-600 dark:text-gray-400 transition-colors">
                <Github size={20} />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block"
                >
                  <path d="M22.999,16c-0.151-4.936-1.392-8.135-2.226-9.748c-0.415-0.803-1.136-1.396-2.003-1.652	c-0.937-0.277-2.205-0.596-3.073-0.596c-0.254,0-0.696,0-0.696,0l-0.999,1.139c0,0-1.33-0.139-2.002-0.139s-1.987,0.139-1.987,0.139	l-1.01-1.139c0,0-0.432,0-0.685,0c-0.868,0-2.136,0.319-3.073,0.596C4.377,4.856,3.656,5.448,3.241,6.252	c-0.834,1.613-2.075,5.801-2.226,10.737c0,0,0.234,0.336,0.803,0.746C2.883,18.589,6.332,20,8.128,20l0.884-1.37	c-2.189-0.57-3.558-1.575-3.637-1.634l1.495-2.003c0.021,0.015,2.109,1.525,5.13,1.525c3.001,0,5.107-1.509,5.127-1.524l1.496,2.004	c-0.079,0.058-1.429,1.043-3.58,1.616L15.954,20c0.076,0,3.555-0.399,7.036-2.824C23.001,17.131,23.019,16.671,22.999,16z M8.5,14	C7.672,14,7,13.105,7,12c0-1.105,0.672-2,1.5-2s1.5,0.895,1.5,2C10,13.105,9.328,14,8.5,14z M15.5,14c-0.828,0-1.5-0.895-1.5-2	c0-1.105,0.672-2,1.5-2s1.5,0.895,1.5,2C17,13.105,16.328,14,15.5,14z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  className="inline-block"
                >
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
