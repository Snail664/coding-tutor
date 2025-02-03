"use client";
import AssistantWindow from "@/components/features/Assistant";
import ExecutionWindow from "@/components/features/CodeExecution";
import QuestionWindow from "@/components/features/Question";
import EditorWindow from "@/components/features/CodeEditor";
import SplitPane from "@/components/layout/SplitPane";
import { useAppDispatch, useAppSelector } from "@/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import Walkthrough from "@/components/features/Walkthrough";
import { fetchUserDataThunk } from "@/slices/AuthSlice";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/Navbar";

export default function Main() {
  const { user: auth0User, isLoading: auth0Loading } = useUser();
  const { isLoading: dbLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
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
    return <LoadingScreen />;
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
      <Navbar auth0User={auth0User} />
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
      <div style={{ marginTop: "10px", flexShrink: 0 }}>
        <AssistantWindow />
      </div>
    </div>
  );
}
