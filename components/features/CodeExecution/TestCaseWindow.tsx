// TestCaseWindow.tsx

import { TestResult } from "@/lib/types";
import TestCaseResult from "./TestCaseResult";

interface TestCaseWindowProps {
  numPassed: number;
  numFailed: number;
  testCases: TestResult[];
}

export default function TestCaseWindow({
  numPassed,
  numFailed,
  testCases,
}: TestCaseWindowProps) {
  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">
        {numPassed} / {numPassed + numFailed} test cases passed
      </div>
      <div className="space-y-4">
        {testCases.map((testCase, index) => (
          <TestCaseResult
            key={index}
            testCase={testCase}
            index={index}
            defaultExpanded={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
