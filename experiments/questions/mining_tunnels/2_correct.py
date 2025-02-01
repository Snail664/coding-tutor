from heapq import heappush, heappop
from dataclasses import dataclass, field

@dataclass(order=True)
class Node:
    priority: int = field(compare=True)
    x: int = field(compare=False)
    y: int = field(compare=False)
    level: int = field(compare=False)
    steps: int = field(compare=False)

def parse_maze(data):
    # Split into levels and convert to 2D grid
    levels = []
    current_level = []
    
    for line in data.strip().split('\n'):
        if line.strip() and line.strip().isdigit():
            if current_level:
                levels.append(current_level)
                current_level = []
        elif line.strip():
            current_level.append(list(line))
    
    if current_level:
        levels.append(current_level)
    return levels

def get_distance(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)

def find_elevators(maze):
    elevators = set()
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == '$':
                elevators.add((x, y))
    return elevators

def solve_maze(data):
    # Setup initial maze state
    levels = parse_maze(data)
    if len(levels) != 2:
        return -1
    
    maze1, maze2 = levels
    height = len(maze1)
    width = len(maze1[0])
    elevators = find_elevators(maze1)
    
    # Initialize search
    to_visit = []
    visited = set()
    end_x, end_y = width-1, height-1
    
    # Add starting position
    heappush(to_visit, Node(0, 0, 0, 0, 0))
    
    # Main search loop
    while to_visit:
        current = heappop(to_visit)
        state = (current.x, current.y, current.level)
        
        # Skip if we've been here
        if state in visited:
            continue
        
        # Check if we reached the end
        if (current.x, current.y) == (end_x, end_y) and current.level == 0:
            return current.steps
        
        visited.add(state)
        current_maze = maze1 if current.level == 0 else maze2
        
        # Try moving in all four directions
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = current.x + dx
            new_y = current.y + dy
            
            # Check if move is valid
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_maze[new_y][new_x] != '#'):
                new_steps = current.steps + 1
                new_priority = new_steps + get_distance(new_x, new_y, end_x, end_y)
                
                heappush(to_visit, Node(new_priority, new_x, new_y, 
                                      current.level, new_steps))
        
        # Try using elevator if available
        if (current.x, current.y) in elevators:
            new_level = 1 - current.level  # Switch levels
            new_steps = current.steps + 1
            new_priority = new_steps + get_distance(current.x, current.y, end_x, end_y)
            
            heappush(to_visit, Node(new_priority, current.x, current.y, 
                                  new_level, new_steps))
    
    return -1

def solution(data):
    return solve_maze(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        print(solution(f.read()))