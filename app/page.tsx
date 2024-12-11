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
import { clearUser } from "@/slices/AuthSlice";
import { setUser } from "@/slices/AuthSlice";
import { useEffect } from "react";

export type WindowProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Page() {
  const { theme, setTheme } = useTheme();
  const { user, isLoading } = useUser();
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        dispatch(
          setUser({
            sid: user.sid as string,
            sub: user.sub ?? "",
            name: user.name ?? "",
            email: user.email ?? "",
            picture: user.picture ?? "",
          })
        );
      } else {
        dispatch(clearUser());
      }
    }
  }, [user, isLoading, dispatch]);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",

        width: "100vw",
      }}
      className=""
    >
      <div className="flex flex-row gap-2 items-center justify-between mb-2 text-lg font-bold">
        {/* header left */}
        <div>The Coding Tutor</div>
        {/* header right */}
        <div className="flex flex-row gap-2 items-center">
          {!user && <a href="/api/auth/login">Login</a>}
          {user && <a href="/api/auth/logout">Logout</a>}
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
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
          defaultSize={window.innerWidth / 2}
          maxSize={window.innerWidth - 500}
        >
          <QuestionWindow />
          <SplitPane
            split="horizontal"
            minSize={53}
            defaultSize={(window.innerHeight - 20) / 2}
            maxSize={window.innerHeight - 308}
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
