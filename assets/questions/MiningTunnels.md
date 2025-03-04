# Mining Tunnels

**Topics:** Graph, Shortest Path, Breadth-First Search

It's your second last day on the moon before your return to Earth, so you have taken a tour of the old mining tunnels that were dug out in the early days of the moon's settlement. You've thoroughly enjoyed the tour but have become separated from the tour guide and realized you need to find your own way out. Fortunately, there is a big map on the wall nearby. It seems a lot of the tunnels have dead ends, but there are still many different paths you could take to exit. You're starting to get a little hungry though (it is dinner time after all!), so you don't want to wander the tunnels longer than necessary.

One important issue with the tunnels is that there are tunnels on two different levels. Sometimes it is quicker to go up or down a level as part of your journey to the exit.

Process the map to determine the shortest route out of the tunnel system.

### Example

The following is a small example input data for the tunnels. You start at the entrance at the **top-left** and need to make your way to the **exit at the bottom-right**. Each `$` symbol represents an elevator that you can optionally take to the alternate level. 

Note: You can also pass through an elevator; you do not have to use it to change levels.

#### Map Level 1:
```
#####################
................#...#
###########.###.#.#.#
#...#.......#.#...#.#
#.#.#.#######.#####.#
#.#..$#.#.$....$....#
#.#####.#.#######.###
#.#.......#.....#.#.#
#.#########.###.#.#.#
#.#...........#.#...#
#.#.#$####$.###$###.#
#...#.....#.#...#...#
#.###.###.###.#.#.###
#...#.#.....#.#.#...#
#####################
#.#.#$..#.$...#$..#.#
#.#.###.###.#.#.###.#
#...#...#...#.....#.#
#.###.###.#.#####.#.#
#...#.....#..........
#####################
```

#### Map Level 2:
```
#####################
#.........#.........#
#.###.###.#########.#
#.......#...........#
#######.###########.#
#....$#...$....$....#
#.###.#####.#######.#
#.#.........#.......#
#.#####.#.#.#.#####.#
#...#...#.#.#.#...#.#
###.#$###.$.#.#$#.#.#
#...#.#.#.#...#.#.#.#
#.#.#.#.#.###.#.#.#.#
#.#.....#.........#.#
#.#####.###.#####.#.#
#....$#...$.#..$..#.#
#.###.#.###.#.#####.#
#...#...#.....#.....#
###.#####.#####.#####
#.......#...........#
#####################
```

In this example, the shortest path out takes **52 steps**. That would be your answer.

### Try a Walk Through

Michael McLeod from Pakuranga College has created an interactive version of the example and final maze in JavaScript for you to walk through with a first-person viewpoint! These are really cool, have a try at:

[Interactive Maze Walkthrough](https://haque.rs/maze/)

### Your Task

For the map in the input data, what is the number of steps for the shortest path out of the maze?