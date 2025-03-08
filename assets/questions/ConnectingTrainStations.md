# Connecting Train Stations

## Topics: 

`Combinatorics` `Dynamic Programming` `Recursion`

While there are a couple of major train stations in the region, the current railway network only connects them indirectly with several transfers. Transportation planners are now exploring alternative ways to establish a direct railway connection between these stations, which lie **856 kilometres** apart.

### Options:

- **Option 1**: An express train service can cover up to **40 kilometres** in one continuous segment before a transfer (or service change) is required.
- **Option 2**: A regional train service can operate for **12 kilometres** per segment before needing a change.
- **Option 3**: A local urban rail or tram segment can travel for **1 kilometre** before it must connect with another service.

Each option offers unique advantages and disadvantages:

- **Express trains** can cover long distances quickly but require precise scheduling.
- **Regional trains** are more flexible in handling intermediate distances.
- **Local trams** are ideal for short segments within or near urban areas, though not practical for long stretches.

Looking at the various range capacities of each train service, you soon realize there are many possible ways to configure the segments to cover the full **856 kilometres**.

**Input/Output Format:**

- **Input:**
A single comma-separated string in the format:
"TotalDistance,Segment1,Segment2,...,SegmentN"
For example, the input "856,40,12,1" represents a scenario where the total distance to be connected is **856 kilometres** and the available segment lengths (corresponding to different train service options) are **40 kilometres**, **12 kilometres**, and **1 kilometre**.
- **Output:**
A single integer representing the total number of distinct ordered route configurations that exactly sum up to the target distance.
In the sample case provided, the expected output is **12**.


### Example

Consider a smaller example where a **5 kilometre** distance must be connected and you have 3 service options available, each with a range of **3 kilometres**, **2 kilometres**, or **1 kilometre**. The number of distinct ordered configurations is **13**. Each configuration is illustrated as follows:

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


### Your Task

Using the input provided, your program should parse the total target distance and the list of available segment lengths. Then, it should compute and output the total number of distinct ordered ways to assemble the segments so that their sum equals the target distance.