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
  private language = LANGUAGES.find((lang) => lang.name === "cpp");

  constructor() {
    if (!this.language) {
      throw new Error(
        "Cannot construct C++ Runner, C++ language is not defined in language constants array"
      );
    }
  }

  // Extract function signature from C++ code
  private extractFunctionName(code: string): string | null {
    const match = code.match(
      /(\w+)\s*\([^)]*const\s+vector\s*<\s*string\s*>\s*&[^)]*\)\s*\{/
    );
    return match ? match[1] : null;
  }

  prepareCode(userCode: string, testCases: TestCase[]): string {
    const functionName = this.extractFunctionName(userCode);
    if (!functionName) {
      throw new Error("No function definition found in the user code.");
    }

    // // Convert test cases to a JSON string
    const testCasesJSON = JSON.stringify(testCases);

    // Generate C++ test runner code
    const testRunnerCode = `
    #include <iostream>
    #include <vector>
    #include <string>
    #include <sstream>
    #include <algorithm>
    #include <regex>

    using namespace std;

    struct TestCase {
      vector<string> input;
      string expectedOutput;
    };

    struct TestResult {
      string actualOutput;
      bool passed;
      string userPrints;
      string error;
    };

    ${userCode}

    string escapeJson(const string& s) {
      string escaped;
      for (char c : s) {
          switch (c) {
              case '"':  escaped += "\\\\\\""; break;
              case '\\\\': escaped += "\\\\\\\\"; break;
              case '\\n': escaped += "\\\\n";  break;
              case '\\r': escaped += "\\\\r";  break;
              case '\\t': escaped += "\\\\t";  break;
              default:   escaped += c;
          }
      }
      return escaped;
    }

    int main() {

      vector<TestCase> testCases = {
<<<<<<< HEAD
        ${testCases.map((tc)  => `{
          {
            /**
             * Convert the input of the test case into a string format:
             * - If the input is an array, convert each element to a string.
             * - If the element is a string, escape double quotes.
             * - If the element is a number or an array of numbers/number arrays, convert it to a JSON string.
             */
              ${Array.isArray(tc.input) 
=======
        ${testCases
          .map(
            (tc) => `{
          {
              ${
                Array.isArray(tc.input)
>>>>>>> b74b4f8d2ae4bbf99cd34ec55cff79b97ad99588
                  ? (tc.input as (string | number | number[] | number[][])[])
                      .map((line: string | number | number[] | number[][]) => {
                        const strLine =
                          typeof line === "string"
                            ? line
                            : JSON.stringify(line);
                        return `"${strLine.replace(/"/g, '\\"')}"`;
                      })
                      .join(",\n                ")
                  : `"${String(tc.input).replace(/"/g, '\\"')}"`
              }
          },
<<<<<<< HEAD
          /**
           * Convert the expected output of the test case into a string format:
           * - If the expected output is a string, escape double quotes.
           * - If the expected output is not a string, convert it to a JSON string.
           */
          "${typeof tc.expectedOutput === 'string' 
              ? tc.expectedOutput.replace(/"/g, '\\"') 
              : JSON.stringify(tc.expectedOutput)}"
        }`).join(",\n        ")}
=======
          "${
            typeof tc.expectedOutput === "string"
              ? tc.expectedOutput.replace(/"/g, '\\"')
              : JSON.stringify(tc.expectedOutput)
          }"
        }`
          )
          .join(",\n        ")}
>>>>>>> b74b4f8d2ae4bbf99cd34ec55cff79b97ad99588
        };

      vector<TestResult> results;
      streambuf* origCout = cout.rdbuf();
      stringstream outputCapture;

      for (auto& tc : testCases) {
          TestResult res;
          outputCapture.str("");
          cout.rdbuf(outputCapture.rdbuf());
          
          try {
              auto actual = ${functionName}(tc.input);
              cout.rdbuf(origCout);
              
              res.userPrints = outputCapture.str();
              stringstream ss;
              ss << actual;
              res.actualOutput = escapeJson(ss.str());
              res.passed = (ss.str() == tc.expectedOutput);
          } catch (const exception& e) {
              cout.rdbuf(origCout);
              res.error = escapeJson(e.what());
              res.passed = false;
          } catch (...) {
              cout.rdbuf(origCout);
              res.error = "Unknown error";
              res.passed = false;
          }
          results.push_back(res);
      }

      // Generate JSON output manually
      std::string output = "{\\\"testCases\\\":[";
      for (size_t i = 0; i < results.size(); ++i) {
          auto& r = results[i];
          output += "{\\\"actualOutput\\\":\\\"" + r.actualOutput + "\\\","
              "\\\"passed\\\":" + (r.passed ? "true" : "false") + ","
              "\\\"userPrints\\\":\\\"" + escapeJson(r.userPrints) + "\\\","
<<<<<<< HEAD
              "\\\"error\\\":\\\"" + r.error + "\\\"" + "}";
=======
              "\\\"error\\\":\\\"" + r.error + "\\\"" + 
          "}";
>>>>>>> b74b4f8d2ae4bbf99cd34ec55cff79b97ad99588
          output += (i < results.size()-1) ? "," : "";
      }
      output += "]}";
      fprintf(stdout, "%s", output.c_str());
      return 0;
}`;

    // Combine user's code with the test runner
    return testRunnerCode;
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
<<<<<<< HEAD
      try{
        resultArr = JSON.parse(response.data.run["stdout"]);
=======
      try {
        resultArr = JSON.parse(response.data.run["stdout"])["testCases"];
>>>>>>> b74b4f8d2ae4bbf99cd34ec55cff79b97ad99588
        resultArr.map((x: TestResult) => {
          x.passed ? numPassed++ : numFailed++;
        });
      } catch (error) {
        console.error("Failed to parse runner output:", error);
        console.log("Raw stdout:", response.data.run["stdout"]);
      }
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
<<<<<<< HEAD
        message: response.data.run?.stderr
=======
      message: response.data.run?.stderr
>>>>>>> b74b4f8d2ae4bbf99cd34ec55cff79b97ad99588
        ? "Execution failed"
        : "Execution successful",
    };
  }
}
