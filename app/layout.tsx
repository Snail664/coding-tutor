import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./markdown.css";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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

export const metadata: Metadata = {
  title: "Code Tutor",
  description: "AI Coding Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = "light";
  return (
    <html lang="en">
      <UserProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <body
            className={`${theme} ${geistSans.variable} ${geistMono.variable} antialiased min-h-[800px] min-w-[1024px]`}
          >
            {children}
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}
