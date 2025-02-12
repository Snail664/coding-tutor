"use client";
import React, { useState, useEffect } from "react";
import Joyride, { Step, CallBackProps } from "react-joyride";
import { useAppDispatch, useAppSelector } from "@/store";
import { disableWalkthroughThunk } from "@/slices/AuthSlice";

export default function Walkthrough() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [run, setRun] = useState(user?.isWalkthroughEnabled ?? true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && user) {
      setRun(user.isWalkthroughEnabled);
    } else if (!isLoading && !user) {
      setRun(true);
    }
  }, [isLoading, user]);

  const steps: Step[] = [
    {
      target: "body",
      content:
        "If the UI appears too big or too small, try adjusting your browser zoom settings (e.g., Ctrl/Cmd + '+' or '-') to optimize the display.",
      disableBeacon: true,
    },
    {
      target: ".question-button",
      content: "Select different coding problems and read about the task.",
      disableBeacon: true,
    },
    {
      target: ".code-editor",
      content:
        "Write your code solution here. The editor supports syntax highlighting and auto-completion.",
    },
    {
      target: ".execution-button",
      content: "Run your code and see the test results here",
    },
    {
      target: ".hint-button",
      content: "Stuck? Click here or press Cmd+H to get a helpful hint!",
    },
    {
      target: ".chat",
      content:
        "Need more than a hint? Ask questions or get help from our AI assistant. You can type or use voice input.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRun(false);
      dispatch(disableWalkthroughThunk());
    }
  };

  // Only show tour for new users
  if (isLoading || !user) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: "#4F46E5",
          zIndex: 1000,
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
}
