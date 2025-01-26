"use client";
import AssistantWindow from "@/components/features/Assistant";
import ExecutionWindow from "@/components/features/CodeExecution";
import QuestionWindow from "@/components/features/Question";
import EditorWindow from "@/components/features/CodeEditor";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import SplitPane from "../components/layout/SplitPane";
import { useAppDispatch, useAppSelector } from "@/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import NavbarHelpModal from "@/components/features/NavbarHelpModal";
import NavbarUserModal from "@/components/features/NavbarUserModal";
import Walkthrough from "@/components/features/Walkthrough";
import { fetchUserDataThunk } from "@/slices/AuthSlice";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const { user: auth0User, isLoading: auth0Loading } = useUser();
  const { isLoading: dbLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [dimensions, setDimensions] = useState({
    width: 1024,
    height: 800,
  });

  useEffect(() => {
    if (!auth0Loading) {
      if (auth0User) {
        dispatch(fetchUserDataThunk());
      }
    }
  }, [auth0User, auth0Loading, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loading state while either Auth0 or DB data is loading
  if (auth0Loading || dbLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

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
      <Walkthrough />
      <div className="flex flex-row gap-2 items-center justify-between mb-2 text-lg font-bold">
        {/* header left */}
        <div>The Coding Tutor</div>
        {/* header right */}
        <div className="flex flex-row gap-2 items-center">
          <NavbarHelpModal />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          {auth0User && <NavbarUserModal />}
          {!auth0User && <a href="/api/auth/login">Login</a>}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <SplitPane
          split="vertical"
          minSize={500}
          defaultSize={dimensions.width * 0.5}
          maxSize={Math.max(dimensions.width - 500, 500)}
        >
          <QuestionWindow />
          <SplitPane
            split="horizontal"
            minSize={53}
            defaultSize={dimensions.height / 2}
            maxSize={Math.max(dimensions.height - 308, 53)}
          >
            <EditorWindow />
            <ExecutionWindow />
          </SplitPane>
        </SplitPane>
      </div>
      <div style={{ marginTop: "10px", height: "200px", flexShrink: 0 }}>
        <AssistantWindow />
      </div>
    </div>
  );
}
