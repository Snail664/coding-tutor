# Codey's Performance Analysis
Codey the AI bot loves providing hints to help guide students to be future coding professionals. Each coding request made by a student has a complexity level C and a learning value L. However, as Codey has become overwhelmed with the increasing number of requests, it has implemented a new 'efficient' strategy to handle requests in each session. With a limited processing capacity P for a session, Codey will do the following:
1) Find the request with the highest learning value from the current queue of requests which has a complexity level smaller or equal to P. If tied, choose the one with the lowest complexity level.

2) Process the request, removing it from the current queue. Reduce the processing capacity P by C of the request, and add up the learning value L gained this session.

3) Repeat steps 1 and 2 with the remaining processing capacity, until the capacity becomes 0, or if there are no more requests that can be processed within the remaining capacity.

Codey wants to track its performance and asks for your help in determining how much learning value it has provided in each session. Codey will give a list of 2 commands:
1) add C L: add a coding request with complexity level C and learning value L to the queue.

2) process P: using the 'efficient' request selection strategy described above, append the total learning value Codey provided in this session with processing capacity P to an array.

## Input
The first line contains an integer N (1 ≤ N ≤ 2·10⁵) denoting the number of commands. Each of the next N lines contains a string S, denoting either one of the 2 commands. For the add command, two integers will follow, C and L (1 ≤ C,L ≤ 10⁵), denoting the complexity level and learning value of the request respectively. For the process command, one integer will follow, P (1 ≤ P ≤ 10⁵), denoting the processing capacity Codey has for this session.

## Your Task
For each process P command, help Codey track his performance by appending the total learning value Codey provided for that session to an array. 

### Sample Input 1
```
["15",
"add 5 20",
"add 3 15",
"add 7 30",
"process 10",
"add 2 12",
"add 4 18",
"process 8",
"add 6 25",
"add 1 10",
"process 15",
"add 3 22",
"add 5 28",
"process 5",
"add 2 14",
"process 20"]
```

### Sample Output 1
```
[50, 33, 85, 22, 99]
```