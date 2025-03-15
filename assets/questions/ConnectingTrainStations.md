# Connecting Train Stations

## Topics: 

`Combinatorics` `Dynamic Programming` `Recursion`

## Problem Statement

A region’s train network is inefficient, requiring multiple transfers between major stations **856 kilometers apart**. Transportation planners are exploring direct railway connections using train services with different segment lengths.

Each segment has a maximum travel distance before requiring a transfer:

- *Express trains*: 40 km
- *Regional trains*: 12 km
- *Local trams*: 1 km

Each option offers unique advantages and disadvantages:
- **Express trains** can cover long distances quickly but require precise scheduling.
- **Regional trains** are more flexible in handling intermediate distances.
- **Local trams** are ideal for short segments within or near urban areas, though not practical for long stretches.


## Input

A single comma-separated string in the format:
```
"TotalDistance,Segment1,Segment2,...,SegmentN"
```
For example, the input `"856,40,12,1"` represents a scenario where the total distance to be connected is **856 kilometres**.

The available segment lengths (corresponding to different train service options) are **40 kilometres**, **12 kilometres**, and **1 kilometre**.


## Example

### Sample Input
```
totalDistance = 5
segments = [3, 2, 1]
```

### Sample Output
```
13
```


### Explanation
There are 13 ways to exactly reach 5 km using segment lengths [3, 2, 1]:

```
3 + 2
3 + 1 + 1
2 + 3
2 + 2 + 1
2 + 1 + 2
2 + 1 + 1 + 1
1 + 3 + 1
1 + 2 + 2
1 + 2 + 1 + 1
1 + 1 + 3
1 + 1 + 2 + 1
1 + 1 + 1 + 2
1 + 1 + 1 + 1 + 1
```
Each sequence is distinct based on the order of segment choices.

## Constraints
* `1 ≤ totalDistance ≤ 10⁵`
* `1 ≤ len(segments) ≤ 100`
* `1 ≤ segments[i] ≤ totalDistance`
* The input guarantees at least one segment is available.


## Your Task
Using the input provided, your program should parse the total target distance and the list of available segment lengths. 

Return a **single integer** representing the total number of distinct ordered route configurations that exactly sum up to the target distance.