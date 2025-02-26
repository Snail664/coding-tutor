# Import the llm function and parse_json utility from the utils module
from utils import llm, parse_json


class Metric:
    """
    Represents a metric using a fixed evaluation prompt.
    """
    # Class-level evaluation prompt that is shared by all instances.
    evaluation_prompt = (
        "Please evaluate the following LLM input and LLM output based on quality, relevance, and accuracy. Return an integer either 0 or 1. DO NOT return any other tokens."
    )

    def __init__(self, code: str, hint: str):
        self.code = code
        self.hint = hint

    @classmethod
    def set_evaluation_prompt(cls, prompt: str):
        """
        Update the class-wide evaluation prompt.
        """
        cls.evaluation_prompt = prompt

    def _parse_results(self, evaluation_result: str):
        return int(evaluation_result)

    def evaluate(self):
        """
        Evaluate the metric by combining the fixed evaluation prompt with the instance-specific
        llm_input and llm_output, and then calling the llm function from utils.py.
        """
        combined_prompt = (
            f"{self.evaluation_prompt}\n"
            f"Code: {self.code}\n"
            f"Hint: {self.hint}"
        )
        evaluation_result = llm(combined_prompt, 'o1')
        return self._parse_results(evaluation_result)

    def __repr__(self):
        return (
            f"Metric(hint={self.hint!r}, evaluation_prompt={self.evaluation_prompt!r})"
        )


class RelevanceMetric(Metric):
    """
    Represents a relevance metric that evaluates whether the provided hint is relevant to the code.
    """

    evaluation_prompt = (
        "Based on Code and Hint given, evaluate whether the hint describes a syntax error. If the hint pertains to a syntax error, return 1; otherwise return 0. DO NOT return any other tokens."
    )

    def __init__(self, code: str, hint: str):
        super().__init__(code, hint)

    def __repr__(self):
        return (
            f"RelevanceMetric(code={self.code!r}, hint={self.hint!r})"
        )


class RobustnessMetric(Metric):
    """
    Represents a robustness metric that evaluates whether the provided hint finds an error in the code.
    """

    evaluation_prompt = (
        "Based on Code and Hint given, evaluate whether the hint finds an error in the code. If the hint finds an error, return 1; otherwise return 0. DO NOT return any other tokens."
    )

    def __init__(self, code: str, hint: str):
        super().__init__(code, hint)

    def __repr__(self):
        return (
            f"RobustnessMetric(code={self.code!r}, hint={self.hint!r})"
        )


class CorrectnessMetric(Metric):
    """
    Represents a correctness metric that evaluates whether the provided hint matches
    the expected hint's intention.
    """

    evaluation_prompt = (
        "Based on Code, Hint and Expected Hint given, evaluate whether the Hint roughly matches "
        "the intention of the Expected Hint. First explain your reasoning, then return an integer: "
        "1 if the hints match in intention, 0 if they don't match. Format your response as a JSON "
        "with 'score' and 'justification' fields. Example:\n"
        "{\n"
        "  \"score\": 1,\n"
        "  \"justification\": \"Both hints point out the need to extract packet length from the input...\"\n"
        "}\n"
    )

    def __init__(self, code: str, hint: str, expected_hint: str):
        super().__init__(code, hint)
        self.expected_hint = expected_hint

    def _parse_results(self, evaluation_result: str) -> tuple:
        """Parse the LLM response into score and justification."""
        try:
            score = int(parse_json(evaluation_result, 'score'))
            justification = parse_json(evaluation_result, 'justification')
            return score, justification
        except Exception as e:
            print(f"Error parsing evaluation result: {e}")
            return 0, f"Error parsing result: {evaluation_result}"

    def evaluate(self):
        """
        Evaluate the metric by combining the fixed evaluation prompt with the instance-specific
        data, then calling the llm function from utils.py.
        Returns a tuple of (score, justification).
        """
        combined_prompt = (
            f"{self.evaluation_prompt}\n"
            f"Code: {self.code}\n"
            f"Hint: {self.hint}\n"
            f"Expected Hint: {self.expected_hint}"
        )
        evaluation_result = llm(combined_prompt, 'o1')
        return self._parse_results(evaluation_result)

    def __repr__(self):
        return (
            f"CorrectnessMetric(code={self.code!r}, hint={self.hint!r}, "
            f"expected_hint={self.expected_hint!r})"
        )


class DetailMetric(Metric):
    """
    Represents a detail metric that evaluates whether the provided hint contains specific
    programming function names or method calls.
    """

    evaluation_prompt = (
        "Based on the Hint given, evaluate whether it contains specific mentions of "
        "programming function or method names (e.g., split(), append(), len(), etc.). "
        "First explain your reasoning, then return an integer: 1 if specific function "
        "names are mentioned, 0 if the hint is too general. Format your response as a JSON "
        "with 'score' and 'justification' fields. Example:\n"
        "{\n"
        "  \"score\": 1,\n"
        "  \"justification\": \"The hint specifically mentions using the split() method to parse the input...\"\n"
        "}\n"
    )

    def __init__(self, hint: str):
        # We only need the hint for this metric, code is not needed
        super().__init__(code="", hint=hint)

    def _parse_results(self, evaluation_result: str) -> tuple:
        """Parse the LLM response into score and justification."""
        try:
            score = int(parse_json(evaluation_result, 'score'))
            justification = parse_json(evaluation_result, 'justification')
            return score, justification
        except Exception as e:
            print(f"Error parsing evaluation result: {e}")
            return 0, f"Error parsing result: {evaluation_result}"

    def evaluate(self):
        """
        Evaluate the metric by checking if the hint contains specific function names.
        Returns a tuple of (score, justification).
        """
        combined_prompt = (
            f"{self.evaluation_prompt}\n"
            f"Hint: {self.hint}"
        )
        evaluation_result = llm(combined_prompt, 'o1')
        return self._parse_results(evaluation_result)

    def __repr__(self):
        return f"DetailMetric(hint={self.hint!r})"


class QualityMetric(Metric):
    """
    Represents a quality metric that evaluates multiple aspects of hint quality:
    - Detail: presence of function/method names
    - Correctness: match with expected hint intention
    - Specificity: multiple next steps provided
    - LevelOfDetail: presence of code snippets
    """

    evaluation_prompt = (
        "Evaluate the given hint based on four criteria:\n"
        "1. Correctness: Does the hint match the intention of the expected hint?\n"
        "2. Specificity: Does the hint suggest more than one next step or action to take? (as a general guideline, if action can be done in less than 3 lines of code, it is a single step)\n"
        "3. LevelOfDetail: Does the hint contain specific Python code or code snippets?\n\n"
        "Format your response as a JSON with the following fields:\n"
        "- correctness_score: 1 if hints match in intention, 0 if they don't\n"
        "- correctness_justification: Explanation for the correctness score\n"
        "- specificity_score: 1 if multiple next steps are suggested, 0 if only one or none\n"
        "- specificity_justification: Explanation for the specificity score\n"
        "- level_of_detail_score: 1 if contains Python code/snippets, 0 if not\n"
        "- level_of_detail_justification: Explanation for the level of detail score\n\n"
        "Example response:\n"
        "{\n"
        "  \"correctness_score\": 1,\n"
        "  \"correctness_justification\": \"Both hints suggest parsing the input string into components...\",\n"
        "  \"specificity_score\": 1,\n"
        "  \"specificity_justification\": \"The hint suggests both splitting the input and handling edge cases...\",\n"
        "  \"level_of_detail_score\": 1,\n"
        "  \"level_of_detail_justification\": \"The hint includes the code snippet 'str.split()' as an example...\"\n"
        "}\n"
    )

    def __init__(self, code: str, hint: str, expected_hint: str):
        super().__init__(code, hint)
        self.expected_hint = expected_hint

    def _parse_results(self, evaluation_result: str) -> tuple:
        """Parse the LLM response into scores and justifications."""
        try:
            correctness_score = int(parse_json(
                evaluation_result, 'correctness_score'))
            correctness_justification = parse_json(
                evaluation_result, 'correctness_justification')
            specificity_score = int(parse_json(
                evaluation_result, 'specificity_score'))
            specificity_justification = parse_json(
                evaluation_result, 'specificity_justification')
            level_of_detail_score = int(parse_json(
                evaluation_result, 'level_of_detail_score'))
            level_of_detail_justification = parse_json(
                evaluation_result, 'level_of_detail_justification')
            return (
                correctness_score, correctness_justification,
                specificity_score, specificity_justification,
                level_of_detail_score, level_of_detail_justification
            )
        except Exception as e:
            print(f"Error parsing evaluation result: {e}")
            return (0, f"Error parsing result: {evaluation_result}",
                    0, f"Error parsing result: {evaluation_result}",
                    0, f"Error parsing result: {evaluation_result}",
                    0, f"Error parsing result: {evaluation_result}")

    def evaluate(self):
        """
        Evaluate all aspects of hint quality.
        Returns a tuple of (detail_score, detail_justification,
                          correctness_score, correctness_justification,
                          specificity_score, specificity_justification,
                          level_of_detail_score, level_of_detail_justification).
        """
        combined_prompt = (
            f"{self.evaluation_prompt}\n"
            f"Code: {self.code}\n"
            f"Hint: {self.hint}\n"
            f"Expected Hint: {self.expected_hint}"
        )
        evaluation_result = llm(combined_prompt, 'o1')
        return self._parse_results(evaluation_result)

    def __repr__(self):
        return (
            f"QualityMetric(code={self.code!r}, hint={self.hint!r}, "
            f"expected_hint={self.expected_hint!r})"
        )
