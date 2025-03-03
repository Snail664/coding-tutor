**Problem Statement:**

Given an array of strings, where each string represents a star system in the format:

"Star Name: distance, x, y, z" (assume maximum distance possible is 26)

Your task is to:
1. Parse each string to extract the star's 3D coordinates (x, y, z).
2. Compute the Euclidean distance between every unique pair of star systems using the formula:

  distance = sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2 + (z_1 - z_2)^2}

3. Return the smallest computed distance, rounded to three decimal places.

**Example:**

_Input:_
- `["Star A: 1.0, 0.0, 0.0, 0.0", "Star B: 2.0, 3.0, 0.0, 0.0"]`

_Expected Output:_
- `3.000`