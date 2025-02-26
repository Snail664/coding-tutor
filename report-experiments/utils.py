import json
import time
from openai import OpenAI
from anthropic import Anthropic

# Initialize clients
openai_client = OpenAI(
    api_key="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")
anthropic_client = Anthropic(
    api_key="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")


def count_words(text):
    """Count words in text, handling code blocks and special characters."""
    # Split on whitespace and filter out empty strings
    return len([word for word in text.split() if word.strip()])


def llm(prompt, model="gpt-4o-mini", diagnostics=False):
    """
    Send prompt to specified LLM and return response with metrics.

    Args:
        prompt (str): The input prompt
        model (str): Model identifier
        diagnostics (bool): Whether to return additional metrics

    Returns:
        If diagnostics=False: str (response content)
        If diagnostics=True: tuple (content, input_metrics, output_metrics, time_taken)
            where metrics is a dict containing 'tokens' and 'words' for both providers
    """
    start_time = time.time()

    try:
        # Handle Anthropic models
        if model.startswith("claude"):
            response = anthropic_client.messages.create(
                model=model,
                max_tokens=8192,
                messages=[{"role": "user", "content": prompt}]
            )
            content = response.content[0].text

            # Both token and word counts for Anthropic
            input_metrics = {
                'tokens': response.usage.input_tokens,
                'words': count_words(prompt)
            }
            output_metrics = {
                'tokens': response.usage.output_tokens,
                'words': count_words(content)
            }

        # Handle OpenAI models
        else:
            response = openai_client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
            )
            content = response.choices[0].message.content

            # Both token and word counts for OpenAI
            input_metrics = {
                'tokens': response.usage.prompt_tokens,
                'words': count_words(prompt)
            }
            output_metrics = {
                'tokens': response.usage.completion_tokens,
                'words': count_words(content)
            }

        time_taken = time.time() - start_time

        if diagnostics:
            return content, input_metrics, output_metrics, time_taken
        return content

    except Exception as e:
        print(f"Error in llm function with model {model}: {str(e)}")
        raise


def parse_json(json_string: str, key: str) -> str:
    """
    Parses a JSON string and returns the string representation of the value 
    associated with the provided key.

    The provided JSON string may have leading or trailing characters outside 
    the valid JSON. This function extracts the valid JSON content by locating 
    the first occurrence of '{' or '[' and then using JSONDecoder.raw_decode to 
    parse the JSON, thereby ignoring any characters after the valid JSON content.

    Parameters:
    - json_string (str): The JSON formatted string (potentially with extra 
                         characters before or after the valid JSON).
    - key (str): The key to fetch the corresponding value from the JSON.

    Returns:
    - str: The value associated with the provided key, converted to a string.

    Raises:
    - ValueError: If no valid JSON start is found or if the extracted content is not valid JSON.
    - KeyError: If the key does not exist in the parsed JSON.
    """
    import json
    from json import JSONDecoder

    # Find the starting index of valid JSON by locating either '{' or '['.
    start_index = next(
        (i for i, c in enumerate(json_string) if c in '{['), None)
    if start_index is None:
        raise ValueError(
            "No valid JSON start character ('{' or '[') found in the provided string.")

    # Extract the substring starting from the valid JSON character
    json_substring = json_string[start_index:]

    decoder = JSONDecoder()
    try:
        # raw_decode returns a tuple (data, end_index); trailing characters beyond end_index are ignored.
        data, end_index = decoder.raw_decode(json_substring)
    except json.JSONDecodeError as exc:
        raise ValueError("Invalid JSON string provided.") from exc

    try:
        value = data[key]
    except KeyError as exc:
        raise KeyError(f"Key '{key}' not found in the JSON data.") from exc

    return str(value)
