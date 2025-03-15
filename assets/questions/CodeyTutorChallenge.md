# Codey's Tutor Challenge

## Topics: 

`Greedy` `Heap (Priority Queue)` `Sorting`

Codey the Tutor is now swamped with student inquiries. Each student query comes with a question **consumption value Q** and a **monetary reward R** credited from the student's subscription. However, due to the rising number of requests and his limited daily question quota, Codey has adopted an efficient strategy to manage his tutoring sessions.

With a **question quota D** available per session, Codey performs the following actions:

- **Select a query:** Choose the query from the current queue with the highest question consumption that does not exceed D; if multiple queries have the same consumption value, select the one offering the highest monetary reward R.
- **Answer the query:** Remove the selected query from the queue, reduce the remaining quota D by its question consumption Q, and add the monetary reward R to the session's total reward.
- **Repeat:** Continue steps 1 and 2 with the remaining question quota until D reaches 0, or no further queries can be answered within the remaining quota.

Codey will issue a series of two commands:

- **add Q R:** Add a student query with question consumption Q and monetary reward R into the queue.
- **tutor D:** Using the efficient strategy described above, simulate a tutoring session with a question quota D and append the total monetary reward dispensed during that session to a result array.

Write a function that processes a sequence of N commands and returns the result of each "tutor D" command.

## Input
The first line contains an integer N `(1 ≤ N ≤ 2·10⁵)` denoting the number of commands. 
Each of the next N lines contains a string S representing one of the commands. 

For the **add** command, two integers follow, Q and R `(1 ≤ Q, R ≤ 10⁵)`, indicating the question consumption and monetary reward for the query, respectively. 

For the **tutor** command, one integer follows, D `(1 ≤ D ≤ 10⁵)`, representing the available question quota Codey has for that session.

## Example

### Sample Input 1
```
["9",
"add 8 10",
"add 3 25",
"add 5 6",
"tutor 7",
"tutor 7",
"add 1 9",
"add 2 13",
"tutor 20",
"tutor 1"]
```

### Sample Output 1
```
[6, 25, 32, 0]
```

### Explanation
1. First "tutor 7" session:
* Codey picks Q=5, R=6 → Remaining quota: `7 - 5 = 2`
* No more queries fit in quota → Total: `6`

2. Second "tutor 7" session:
* Codey picks Q=3, R=25 → Remaining quota: `7 - 3 = 4`
* No more queries fit in quota → Total: `25`

3. Third "tutor 20" session (after adding new queries):
* Picks Q=3, R=25 → Remaining quota: `20 - 3 = 17`
* Picks Q=2, R=13 → Remaining quota: `17 - 2 = 15`
* Picks Q=1, R=9 → Remaining quota: `15 - 1 = 14`
* Total: `32`

4. Fourth "tutor 1" session:
* No queries fit within quota 1 → Total: `0`


## Constraints
* `1 ≤ N ≤ 2×10⁵` — At most 200,000 commands.
* Each command is either "add Q R" or "tutor D".
* `1 ≤ Q, R ≤ 10⁵` — Maximum question consumption and reward is 100,000.
* `1 ≤ D ≤ 10⁵` — Maximum question quota per session is 100,000.
* The input list follows valid formatting.

## Your Task
For each **tutor D** command, simulate the tutoring session using Codey's efficient strategy and record the total monetary reward dispensed that session in an output array.