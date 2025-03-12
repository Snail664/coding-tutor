# Rotting Oranges

## Topics:

`Breadth-First Search` `Graph` `Matrix` `Queue`

You are given an m x n grid where each cell can have one of three values:

* 0 representing an empty cell,
* 1 representing a fresh orange,
* 2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

## Example
### Sample Input 1
```
[[2,1,1],[1,1,0],[0,1,1]]
```

### Sample Output 1
```
4
```
### Explanation 
![Rotting Oranges](https://assets.leetcode.com/uploads/2019/02/16/oranges.png)


### Sample Input 2:
```
[[2,1,1],[0,1,1],[1,0,1]]
```

### Sample Output 2
```
-1
```

### Explanation 
The orange in the bottom left corner (row 2, column 0) is never rotten because rotting only happens 4-directionally.


### Sample Input 3:
```
grid = [[0,2]]
```

### Sample Output 3
```
0
```

### Explanation 
Since there are no fresh oranges at the beginning, the answer is 0.

## Constraints:

`m == grid.length`\
`n == grid[0].length`\
`1 <= m, n <= 10 `\
`grid[i][j] is 0, 1, or 2.`