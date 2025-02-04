import { TestResult } from "@/lib/types";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface TestCaseResultProps {
  testCase: TestResult;
  index: number;
  defaultExpanded: boolean;
}

export default function TestCaseResult({
  testCase,
  index,
  defaultExpanded,
}: TestCaseResultProps) {
  const passed = testCase.passed;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`p-4 rounded-md border cursor-pointer ${
        passed
          ? "border-green-400 bg-green-50 text-green-900"
          : "border-red-400 bg-red-50 text-red-900"
      }`}
    >
      <div className="flex items-center mb-2">
        {passed ? (
          <CheckCircle className="text-green-500 mr-2" />
        ) : (
          <XCircle className="text-red-500 mr-2" />
        )}
        <span className="font-medium text-lg">
          {passed
            ? `Passed Test Case ${index + 1}`
            : `Failed Test Case ${index + 1}`}
        </span>
      </div>
      {isExpanded && (
        <div className="text-sm">
          <div className="mb-1">
            <span className="font-semibold">Input:</span>{" "}
            <span className="whitespace-normal break-words">
              {testCase.testCase.input}
            </span>
          </div>
          <div className="mb-1">
            <span className="font-semibold">Expected Output:</span>{" "}
            <span className="whitespace-normal break-words">
              {Array.isArray(testCase.testCase.expectedOutput)
                ? JSON.stringify(testCase.testCase.expectedOutput)
                : testCase.testCase.expectedOutput}
            </span>
          </div>
          <div className="mb-1">
            <span className="font-semibold">Actual Output:</span>{" "}
            <span className="whitespace-normal break-words">
              {testCase.actualOutput || testCase.error}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
