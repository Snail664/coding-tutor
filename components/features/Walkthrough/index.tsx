import React, { useState } from "react";
import Joyride, { Step, CallBackProps } from "react-joyride";
import { useAppSelector } from "@/store";

export default function Walkthrough() {
  const [run, setRun] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const steps: Step[] = [
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
      target: ".assistant-input",
      content:
        "Need more than a hint?Ask questions or get help from our AI assistant. You can type or use voice input.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRun(false);
    }
  };

  // Only show tour for new users
  if (!user) return null;

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
