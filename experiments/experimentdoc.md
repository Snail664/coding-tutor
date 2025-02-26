# Experiments
The purpose of this folder is to evaluate various LLMs to see how good they are at providing guidance.

## Variable 1 - Source Code
The purpose of these experiements is to evaluate how good the LLM is in providing feedback on a given piece of code. The goal of the LLM is to provide a simple nudging comment similar to what a teacher might say to a student to prompt the student to take the next step. Instead of providing an elaborate explanation of how to solve the problem. We assess the student's code based on various dimensions but do not inlcude syntax errors since this is handled by the compiler.

We assess for the following issues in the code:  
1. **Correct but incomplete** - student is on the right track but hasn't finished writing the code yet
2. **Correct and complete** - student is done and answer is correct
3. **Logical errors** - solution contains logical errors

Methodology:
1. **Correct and complete**: Give the question to ChatGPT o1-preview and ask it to generate the correct solution
2. **Correct but incomplete**: Take the correct solution generated, and randomly delete a portion of it. If the code has 45 lines, randomly pick a number between 1 and 45, x, and delete all lines of code including and after line x.
3. **Logical errors**: Ask ChatGPT o1-preview to craft a solution with a deliberate logical error

## Variable 2 - Appropriateness of help timing
The purpose of these experiments is to evaluate how good the system is at determining whether it is appropriate to help the student at a given time based on the following:
1. Number of attempts
2. How long the student has spent on the question
3. The student's audio transcript

## Holistic Evaluation
Evaluation of (1) and (2) combined.