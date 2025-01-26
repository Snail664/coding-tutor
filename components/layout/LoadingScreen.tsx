import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function LoadingScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex flex-row gap-2 items-center justify-between mb-2 text-lg font-bold">
        <div>The Coding Tutor</div>
        <div className="flex flex-row gap-2 items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <a href="/api/auth/login">Login</a>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    </div>
  );
}
