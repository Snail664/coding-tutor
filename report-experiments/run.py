import os
import json


class Run:
    """
    The Run class represents an experiment run with:

      - A question stored in a markdown (.md) file,
      - A student's solution stored in a Python (.py) file,
      - Optionally test case results stored in a JSON (.json) file,
      - Optionally a model solution stored in a Python (.py) file.

    The file paths for each of these files can be located in different directories.

    Parameters:
        question_path (str): Path to the markdown file containing the question.
        student_solution_path (str): Path to the Python file containing the student's solution.
        test_case_results_path (str, optional): Path to the JSON file containing test case results.
        model_solution_path (str, optional): Path to the Python file containing the model solution.

    Raises:
        ValueError: If the required files (question file or student solution file) do not exist.
    """

    def __init__(self, question_path, student_solution_path, test_case_results_path=None, test_case_result_mode='FULL', model_solution_path=None):
        if test_case_result_mode not in ['FULL', 'REDUCED']:
            raise ValueError(
                "test_case_result_mode must be either 'FULL' or 'REDUCED'")
        self.test_case_result_mode = test_case_result_mode

        # Load the question from the provided markdown file.
        if not os.path.exists(question_path):
            raise ValueError(f"Question file not found: {question_path}")
        with open(question_path, "r", encoding="utf-8") as f:
            self.question = f.read()

        # Load the student's solution from the provided Python file.
        if not os.path.exists(student_solution_path):
            raise ValueError(
                f"Student solution file not found: {student_solution_path}")
        with open(student_solution_path, "r", encoding="utf-8") as f:
            self.studentSolution = f.read()

        # Optionally load testCaseResults from the provided JSON file.
        if test_case_results_path and os.path.exists(test_case_results_path):
            with open(test_case_results_path, "r", encoding="utf-8") as f:
                test_case_data = json.loads(f.read())
                if self.test_case_result_mode == 'REDUCED':
                    # Keep only essential information in reduced mode
                    self.testCaseResults = {
                        'numPassed': test_case_data.get('numPassed', 0),
                        'numFailed': test_case_data.get('numFailed', 0),
                        'stderr': test_case_data.get('stderr', None),
                    }
                else:  # FULL mode
                    self.testCaseResults = test_case_data
        else:
            self.testCaseResults = None

        # Optionally load modelSolution from the provided Python file.
        if model_solution_path and os.path.exists(model_solution_path):
            with open(model_solution_path, "r", encoding="utf-8") as f:
                self.modelSolution = f.read()
        else:
            self.modelSolution = None

    def __str__(self):
        result = f"Question:\n{self.question}\n\n"
        result += f"Student Solution:\n{self.studentSolution}\n\n"
        if self.testCaseResults is not None:
            result += f"Test Case Results:\n{self.testCaseResults}\n\n"
        if self.modelSolution is not None:
            result += f"Model Solution:\n{self.modelSolution}\n"
        return result

# Example usage:
# Suppose your files are stored in different directories as follows:
#
# question_path = "/path/to/question.md"
# student_solution_path = "/another/path/studentSolution.py"
# test_case_results_path = "/yet/another/path/testCaseResults.json"  # optional
# model_solution_path = "/additional/path/modelSolution.py"         # optional
#
# run_instance = Run(question_path, student_solution_path, test_case_results_path, model_solution_path)
#
# print(run_instance)
