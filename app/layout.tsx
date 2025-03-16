import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from 'next/font/google';
import "./globals.css";
import "./markdown.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { getSession } from "@auth0/nextjs-auth0";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Ask Codey",
  description: "AI Coding Tutor",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>
          {/* Fixed Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 dark:border-gray-800">
            <Navbar auth0User={session?.user} hideMiddle={true} />
          </header>
          
          {/* Main Content with top padding for navbar */}
          <main className="pt-16">
            {children}
          </main>
          
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
