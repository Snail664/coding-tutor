You are given an object with three keys:

locations: An array of location names.
distances: A 2D matrix where the value at row i and column j is the distance between locations[i] and locations[j].
routes: An array of strings that describe each rover's journey. Each string follows the format:
"Rover X route: base -> ... -> base",
indicating the order of locations visited (each journey starts and ends at "base").
Task:
Calculate and return the total distance traveled by all rovers by summing the distances between consecutive locations in each route.

Example

Input:

python
Copy
data = {
    "locations": ["base", "A", "B"],
    "distances": [
        [0, 10, 20],
        [10, 0, 15],
        [20, 15, 0]
    ],
    "routes": [
        "Rover 1 route: base -> A -> base",
        "Rover 2 route: base -> B -> base"
    ]
}
Expected Output:

Copy
60