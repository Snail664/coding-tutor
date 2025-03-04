# Codey's Tutor Challenge

**Topics:** Heap (Priority Queue), Greedy, Sorting

Codey the Tutor is now swamped with student inquiries. Each student query comes with a question consumption value Q and a monetary reward R credited from the student's subscription. However, due to the rising number of requests and his limited daily question quota, Codey has adopted an efficient strategy to manage his tutoring sessions.

With a question quota D available per session, Codey performs the following actions:

- **Select a query:** Choose the query from the current queue with the highest question consumption that does not exceed D; if multiple queries have the same consumption value, select the one offering the highest monetary reward R.
- **Answer the query:** Remove the selected query from the queue, reduce the remaining quota D by its question consumption Q, and add the monetary reward R to the session's total reward.
- **Repeat:** Continue steps 1 and 2 with the remaining question quota until D reaches 0, or no further queries can be answered within the remaining quota.

Uncertain if this efficient method is optimal, Codey asks for your help to compute the total monetary reward dispensed in each tutoring session.

Codey will issue a series of two commands:

- **add Q R:** Add a student query with question consumption Q and monetary reward R into the queue.
- **tutor D:** Using the efficient strategy described above, simulate a tutoring session with a question quota D and append the total monetary reward dispensed during that session to a result array.

## Input
The first line contains an integer N (1 ≤ N ≤ 2·10⁵) denoting the number of commands. Each of the next N lines contains a string S representing one of the commands. For the **add** command, two integers follow, Q and R (1 ≤ Q, R ≤ 10⁵), indicating the question consumption and monetary reward for the query, respectively. For the **tutor** command, one integer follows, D (1 ≤ D ≤ 10⁵), representing the available question quota Codey has for that session.

## Your Task
For each **tutor D** command, simulate the tutoring session using Codey's efficient strategy and record the total monetary reward dispensed that session in an output array.

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