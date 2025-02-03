# Kattis's Quest
Kattis the Cat enjoys clearing quests on her mobile game. Each quest has an energy consumption E, and gold reward G. However, as Kattis has become very busy lately with grading her student's problem sets, she does not have much spare time as before to keep clearing quests. As such, she has adopted a new 'greedy' strategy to clear her quests in each session as quickly as possible. With energy X for a session, she will do the following:
1) Find the largest energy quest from the current pool of quest which is smaller or equal to X, if tied, by the largest gold reward,

2) Clear the quest, removing it from current pool. Reduce energy X by E of the quest, and add up the gold reward G earned this session.

3) Repeat steps 1 and 2 with remaining amount of energy, until energy left becomes 0, or if there are no more quests to be cleared with remaining energy.

However, she is not sure if this strategy is optimal, and wants your help in determining how much she has earned in each playing session. Kattis the Cat will give a list of 2 commands:
1) add E G: add a copy of the quest with energy consumption E and gold reward G into the pool,

2) query X: using the 'greedy' quest clearing strategy described above, append the total amount of gold Kattis the Cat earned in this session with energy X in an array.

## Input
The first line contains an integer N (1 ≤ N ≤ 2·10⁵) denoting the number of commands. Each of the next N lines contains a string S, denoting one of the above commands. For the add command, two integers will follow, E and G (1 ≤ E,G ≤ 10⁵), denoting the energy consumption and gold reward of the quest respectively. For the query command, one integer will follow, X (1 ≤ X ≤ 10⁵), denoting the amount of energy Kattis the Cat has for this session.

## Your Task
For each query X command, append the amount of gold Kattis the Cat earned for that session in an array.

### Sample Input 1
```
["9",
"add 8 10",
"add 3 25",
"add 5 6",
"query 7",
"query 7",
"add 1 9",
"add 2 13",
"query 20",
"query 1"]
```

### Sample Output 1
```
[6, 25, 32, 0]
```