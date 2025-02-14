# Supply Squad

### Difficulty: Medium

You are part of a mountain rescue team, responsible for delivering critical supplies between camps, peaks, and valleys in a vast mountain range.

Each day, supply teams must navigate between various checkpoints based on the shortest possible route to ensure efficiency. However, rugged terrain and unpredictable weather make route planning difficult.

Your goal is to find the shortest round-trip path that visits all checkpoints exactly once and returns to the starting point (Base Camp).


## Input Format

1. Distance Matrix: A list of `N` lists, where `matrix[i][j]` represents the distance from location `i` to location `j`.
* `matrix[i][i] == 0` (no travel needed if staying in the same place).

2. A `space-separated list of checkpoint names`, starting with the reference checkpoint (`Base Camp` or another starting location).


## Example

Consider the following simplified example with the distances between base camp and 3 outposts:

|        | base  | ta00  | cx22  | xj84  |
|--------|-------|-------|-------|-------|
| base   | 0     | 55457 | 63529 | 61302 |
| ta00   | 55457 | 0     | 111890| 35768 |
| cx22   | 63529 | 111890| 0     | 98977 |
| xj84   | 61302 | 35768 | 98977 | 0     |

And in the example drone log:

```
Drone 1 route: base -> cx22 -> ta00 -> base -> xj84 -> base
```

This particular drone traveled as follows:
- From base to cx22 - a distance of 63529.
- From cx22 to ta00 - a distance of 111890.
- From ta00 to base - a distance of 55457.
- From base to xj84 - a distance of 61302.
- From xj84 to base - a distance of 61302.

Sum these distances to calculate the total distance traveled by this drone as **353480**.


## Constraints
* 2≤N≤100 (Number of locations including the hub)
* 0≤ Distance between locations ≤10<sup>6</sup>
* All paths between locations are symmetric (`distance[i][j] == distance[j][i]`).

## Your Task

Return a single integer, representing the **minimum distance** required to visit all locations exactly once and return to the starting point.