// ExecutionWindow.tsx

import { SquarePlay } from "lucide-react";
import CollapsiblePanel from "@/components/layout/CollapsiblePanel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ExecuteCodeButton from "./ExecuteCodeButton";
import TestCaseWindow from "./TestCaseWindow";
import OutputWindow from "./OutputWindow";
import { useAppSelector } from "@/store";

export default function ExecutionWindow() {
  const { codeExecuteResponse } = useAppSelector((state) => state.code);
  const [openTestCase, setOpenTestCase] = useState(true);

  const codeError = codeExecuteResponse.stderr;
  const codeRan = codeExecuteResponse.stdout;
  const testResults = codeExecuteResponse.testCases;

  const numPassed = codeExecuteResponse.numPassed;
  const numFailed = codeExecuteResponse.numFailed;
  const testCases = codeExecuteResponse.testCases;

  return (
    <CollapsiblePanel
      icon={<SquarePlay />}
      title="Output"
      headerActions={<ExecuteCodeButton />}
    >
      <div className="flex flex-col h-full">
        <div className="p-2 flex space-x-2">
          <Button
            className={`hover:bg-primary hover:text-background ${
              openTestCase ? "" : "bg-menuBackground text-primary"
            }`}
            onClick={() => setOpenTestCase(true)}
          >
            Test Cases
          </Button>
          <Button
            className={`hover:bg-primary hover:text-background ${
              !openTestCase ? "" : "bg-menuBackground text-primary"
            }`}
            onClick={() => setOpenTestCase(false)}
          >
            Code Output
          </Button>
        </div>
        <div className="scroll-auto" style={{ height: "700px" }}>
          {openTestCase ? (
            <TestCaseWindow
              numPassed={numPassed}
              numFailed={numFailed}
              testCases={testCases}
            />
          ) : (
            <OutputWindow
              codeError={codeError}
              codeRan={codeRan}
              testResults={testResults}
            />
          )}
        </div>
      </div>
    </CollapsiblePanel>
  );
}
