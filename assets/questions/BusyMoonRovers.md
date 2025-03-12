# Busy Moon Rovers

## Topics: 

`Graph` `Matrix` `String Parsing`

## Problem Statement: 

You runs a logistics and delivery business at a moon base with various outposts. Automated rovers deliver supplies to these outposts and **always return** to the **main base** at the end of the day. 

Your task is to calculate the total distance traveled by all rovers based on a given **distance matrix** and **rover routes**.
The distance matrix represents the direct distances between locations, and each rover's journey is provided as a sequence of waypoints.

## Input:

You are given a dictionary **`data`** containing:

* **`locations`** (List[str]): A list of location names.

* **`distances`** (List[List[int]]): A square matrix where distances[i][j] represents the travel distance between locations[i] and locations[j].

* **`routes`** (List[str]): A list of rover journey logs in the format:

    `"Rover X route: location_1 -> location_2 -> ... -> location_N"` \
    Each rover always starts and ends at "base".

## Example

Consider the following simplified example with the distances between base camp and 3 outposts:


| Location | base  |  ta00  |  cx22  |  xj84 |
|----------|-------|--------|--------|-------|
|   base   |   0   |  55457 |  63529 | 61302 |
|   ta00   | 55457 |    0   | 111890 | 35768 |
|   cx22   | 63529 | 111890 |    0   | 98977 |
|   xj84   | 61302 |  35768 |  98977 |   0   |

And the following example rover journey log:

```
Rover 1 route: base -> cx22 -> ta00 -> base -> xj84 -> base
```

This particular rover traveled as follows:
- From base to cx22 - a distance of 63529.
- From cx22 to ta00 - a distance of 111890.
- From ta00 to base - a distance of 55457.
- From base to xj84 - a distance of 61302.
- From xj84 to base - a distance of 61302.

Sum these distances to calculate the total distance traveled by this rover as **353480**.

The input data is given in the following format:

```
data = {
    locations: ["base", "ta00", "cx22", "xj84"],
    distances: [
        [0, 55457, 63529, 61302],
        [55457, 0, 111890, 35768],
        [63529, 111890, 0, 98977],
        [61302, 35768, 98977, 0]
    ],
    routes: [
        "Rover 1 route: base -> cx22 -> ta00 -> base -> xj84 -> base",
        "Rover 2 route: base -> ta00 -> cx22 -> base -> xj84 -> base",
    ]
}
```

## Constraints:
* 1 ≤ `len(locations)` ≤ 100
* 1 ≤ `len(routes)` ≤ 10
* 0 ≤ `distances[i][j]` ≤ 10<sup>6</sup>
* Each location appears only once in `locations` and are strings.
* The matrix is symmetric: `distances[i][j]` == `distances[j][i]`


## Your Task

Return a single integer representing the total distance travelled by all rovers. 