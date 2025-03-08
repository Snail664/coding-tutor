import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LoadingScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Improved navbar with better spacing and alignment */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center pl-2">
              <Link href="/" className="text-xl font-bold text-primary transition-colors hover:text-primary/80">
                Codey
              </Link>
            </div>

            {/* Right side - Theme toggle and login */}
            <div className="flex items-center gap-4 pr-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full h-9 w-9 transition-colors hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                className="rounded-full transition-colors hover:bg-muted"
                asChild
              >
                <Link href="/api/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Loading content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium text-muted-foreground">Loading...</p>
        </div>
      </main>
    </div>
  );
}
