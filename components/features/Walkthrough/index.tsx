"use client";
import React, { useState, useEffect } from "react";
import Joyride, { Step, CallBackProps, ACTIONS, EVENTS } from "react-joyride";
import { useAppDispatch, useAppSelector } from "@/store";
import { disableWalkthroughThunk } from "@/slices/AuthSlice";

export default function Walkthrough() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && user) {
      console.log('Walkthrough state:', { 
        isWalkthroughEnabled: user.isWalkthroughEnabled, 
        run,
        user: user
      });
      setRun(user.isWalkthroughEnabled);
    }
  }, [isLoading, user, run]);

  const steps: Step[] = [
    {
      target: "body",
      content:
        "If the UI appears too big or too small, try adjusting your browser zoom settings (e.g., Ctrl/Cmd + '+' or '-') to optimize the display.",
      disableBeacon: true,
      placement: "center",
      hideFooter: false,
      hideCloseButton: true,
    },
    {
      target: ".question-button",
      content: "Select different coding problems and read about the task.",
      disableBeacon: true,
      placement: "bottom",
      hideFooter: false,
      hideCloseButton: true,
      spotlightClicks: false,
    },
    {
      target: ".code-editor",
      content:
        "Write your code solution here. The editor supports syntax highlighting and auto-completion.",
      placement: "left",
      hideFooter: false,
      hideCloseButton: true,
      spotlightClicks: false,
    },
    {
      target: ".execution-button",
      content: "Run your code and see the test results here",
      placement: "top",
      hideFooter: false,
      hideCloseButton: true,
      spotlightClicks: false,
    },
    {
      target: ".hint-button",
      content: "Stuck? Click here or press Cmd+H to get a helpful hint!",
      placement: "bottom",
      hideFooter: false,
      hideCloseButton: true,
      spotlightClicks: false,
    },
    {
      target: ".chat",
      content:
        "Need more than a hint? Ask questions or get help from our AI assistant. You can type or use voice input.",
      placement: "bottom",
      hideFooter: false,
      hideCloseButton: true,
      spotlightClicks: false,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    
    console.log('Joyride callback:', { action, index, status, type });
    
    // Only respond to explicit next/back/skip button clicks
    if (type === EVENTS.STEP_AFTER) {
      if (action === ACTIONS.NEXT) {
        setIsTransitioning(true);
        setTimeout(() => {
          setStepIndex(index + 1);
          setIsTransitioning(false);
        }, 50);
      } else if (action === ACTIONS.PREV) {
        setIsTransitioning(true);
        setTimeout(() => {
          setStepIndex(index - 1);
          setIsTransitioning(false);
        }, 50);
      }
    }
    
    // Only handle completion when skip button is clicked
    if (type === EVENTS.TOUR_END && action === ACTIONS.SKIP) {
      setRun(false);
      setStepIndex(0);
      dispatch(disableWalkthroughThunk());
    }
    
    // Handle finish button on last step
    if (type === EVENTS.TOUR_END && action === ACTIONS.CLOSE) {
      setRun(false);
      setStepIndex(0);
      dispatch(disableWalkthroughThunk());
    }
  };

  // Don't render anything if loading or no user
  if (isLoading || !user) return null;

  return (
    <Joyride
      steps={steps}
      run={run && !isTransitioning}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc
      disableScrolling
      disableScrollParentFix
      disableOverlay={false}
      nonce={`${stepIndex}-${isTransitioning}`}
      spotlightClicks={false}
      styles={{
        options: {
          primaryColor: "#4F46E5",
          zIndex: 1000,
          arrowColor: "#fff",
          backgroundColor: "#fff",
          textColor: "#333",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
        spotlight: {
          borderRadius: 4,
        },
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          backgroundColor: "#4F46E5",
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
      floaterProps={{
        disableAnimation: true,
        hideArrow: false,
        offset: 15,
        styles: {
          floater: {
            filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
            transition: 'none'
          }
        }
      }}
      callback={handleJoyrideCallback}
    />
  );
}
