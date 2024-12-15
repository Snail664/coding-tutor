// OutputWindow.tsx

import { TestResult } from "@/lib/types";

interface OutputWindowProps {
  codeError: string | null | undefined;
  codeRan: string | null | undefined;
  testResults: TestResult[] | undefined;
}

export default function OutputWindow({
  codeError,
  codeRan,
  testResults,
}: OutputWindowProps) {
  return (
    <div className="p-4">
      <p>
        Below are compiler errors and user prints to stdout. For test case
        results, or run-time errors refer to Test Case Window
      </p>
      {codeError && (
        <pre className="text-red-500 whitespace-pre-wrap">{codeError}</pre>
      )}
      {codeRan && testResults && (
        <div className="text-green-500">
          {testResults.map((testResult, index) => (
            <div key={index} className="mb-2">
              <strong>Test Case {index + 1}:</strong>
              <pre className="whitespace-pre-wrap">
                {testResult.userPrints
                  ? testResult.userPrints
                  : "nothing on stdout"}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
