import apiClient from "./APIClient";
import {
  LanguageRunner,
  TestCase,
  CodeExecuteResponseT,
  TestResult,
  CodeExecuteResponseCategory,
} from "./types";
import { LANGUAGES } from "@/slices/CodeSlice";
import { LanguageName } from "@prisma/client";

export class RunnerFactory {
  static getRunner(language: LanguageName): LanguageRunner {
    switch (language) {
      case "python":
        return new PythonRunner();
      case "cpp":
        return new CPPRunner();
      // Add cases for other languages
      default:
        throw new Error("Unsupported language");
    }
  }
}

export class PythonRunner implements LanguageRunner {
  private language = LANGUAGES[0];

  constructor() {
    if (!this.language) {
      throw new Error(
        "Cannot construct Python Runner, python language is not defined in language constants array"
      );
    }
  }

  // Extract the function name from the user's code
  private extractFunctionName(code: string): string | null {
    const match = code.match(/def\s+(\w+)\s*\(/);
    return match ? match[1] : null;
  }

  prepareCode(userCode: string, testCases: TestCase[]): string {
    const functionName = this.extractFunctionName(userCode);
    if (!functionName) {
      throw new Error("No function definition found in the user code.");
    }

    // Convert test cases to a JSON string
    const testCasesJSON = JSON.stringify(testCases);

    // Generate code to execute all test cases and collect results
    const testRunnerCode = `
      import json
      import sys
      import io
      from contextlib import redirect_stdout
      
      test_cases = json.loads('${testCasesJSON}')
      
      results = []
      
      for idx, test_case in enumerate(test_cases):
          input_data = test_case['input']
          expected_output = test_case['expectedOutput']
          try:
              user_stdout = io.StringIO()
              with redirect_stdout(user_stdout):
                result = ${functionName}(input_data)
              userPrints = user_stdout.getvalue()

              # Convert both to same type before comparison
              str_result = str(result).strip()
              str_expected = str(expected_output).strip()
              passed = str_result == str_expected

              result_dict = {
                  'actualOutput': str_result,
                  'passed': passed,
                  'userPrints': userPrints
              }
              results.append(result_dict)
          except Exception as e:
              results.append({
                  'actualOutput': '',
                  'passed': False,
                  'error': str(e)
              })
      
      print(json.dumps({'testCases': results}))
      `;

    // Combine the user's code with the test runner code
    const completeCode = `
${userCode}
      
if __name__ == "__main__":
          ${testRunnerCode}
      `;

    return completeCode;
  }

  async runCode(
    preparedCode: string,
    originalCode: string
  ): Promise<CodeExecuteResponseT> {
    const response = await apiClient.post("/execute-code", {
      language: this.language?.name,
      version: this.language?.version,
      code: preparedCode,
    });

    let numPassed = 0;
    let numFailed = 0;
    let resultArr: TestResult[] = [];
    if (response.data.run["stdout"]) {
      resultArr = JSON.parse(response.data.run["stdout"])["testCases"];
      resultArr.map((x: TestResult) => {
        x.passed ? numPassed++ : numFailed++;
      });
    }
    return {
      testCases: resultArr,
      numPassed: numPassed,
      numFailed: numFailed,
      stdout: response.data.run["stdout"],
      stderr: response.data.run["stderr"],
      sourceCode: originalCode,
      category: response.data.run["stderr"]
        ? CodeExecuteResponseCategory.Error
        : CodeExecuteResponseCategory.Success,
      message: "",
    };
  }
}

export class CPPRunner implements LanguageRunner {
  private language = LANGUAGES.find(lang => lang.name === "cpp");

  constructor() {
    if (!this.language) {
      throw new Error(
        "Cannot construct C++ Runner, C++ language is not defined in language constants array"
      );
    }
  }

  // Extract function signature from C++ code
  private extractFunctionName(code: string): string | null {
    const match = code.match(/\b(\w+)\s*\(/);
    return match ? match[1] : null;
  }

  prepareCode(userCode: string, testCases: TestCase[]): string {
    const functionName = this.extractFunctionName(userCode);
    if (!functionName) {
      throw new Error("No function definition found in the user code.");
    }

    // Convert test cases to a JSON string
    const testCasesJSON = JSON.stringify(testCases);

    // Generate C++ test runner code
    const testRunnerCode = `
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>

    using namespace std;

    struct TestCase {
        vector<string> input;
        string expectedOutput;
    };

    int main() {
        string testCasesStr = R"(${testCasesJSON})";
        vector<TestCase> testCases;
        vector<string> results;

        // Manually parse testCasesStr into testCases (assuming simple format)
        stringstream ss(testCasesStr);
        string line;
        while (getline(ss, line, ',')) {
            TestCase tc;
            tc.input.push_back(line);
            testCases.push_back(tc);
        }

        for (auto& test_case : testCases) {
            vector<string> input_data = test_case.input;
            string expected_output = test_case.expectedOutput;
            try {
                stringstream userOutput;
                cout << "Executing: ${functionName} with input ";
                for (const auto& input : input_data) {
                    cout << input << " ";
                }
                cout << endl;
                
                auto result = ${functionName}(input_data);
                userOutput << result;
                string actualOutput = userOutput.str();

                bool passed = (actualOutput == expected_output);
                results.push_back(actualOutput + ", Passed: " + (passed ? "true" : "false"));
            } catch (exception &e) {
                results.push_back("Error: " + string(e.what()));
            }
        }

        for (const auto& res : results) {
            cout << res << endl;
        }
        cout.flush();

        return 0;
}`;

    // Combine user's code with the test runner
    return `${userCode}

${testRunnerCode}`;
  }

  async runCode(
    preparedCode: string,
    originalCode: string
  ): Promise<CodeExecuteResponseT> {
    const response = await apiClient.post("/execute-code", {
      language: this.language?.name,
      version: this.language?.version,
      code: preparedCode,
    });

    let numPassed = 0;
    let numFailed = 0;
    let resultArr: TestResult[] = [];
    if (response.data.run["stdout"]) {
      resultArr = JSON.parse(response.data.run["stdout"]);
      resultArr.map((x: TestResult) => {
        x.passed ? numPassed++ : numFailed++;
      });
    }
    return {
      testCases: resultArr,
      numPassed: numPassed,
      numFailed: numFailed,
      stdout: response.data.run["stdout"],
      stderr: response.data.run["stderr"],
      sourceCode: originalCode,
      category: response.data.run["stderr"]
        ? CodeExecuteResponseCategory.Error
        : CodeExecuteResponseCategory.Success,
      message: "",
    };
  }
}
