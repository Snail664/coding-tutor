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

# Logical error: Wrong distance calculation
def get_distance(x1, y1, x2, y2):
    return (x1 - x2) + (y1 - y2)  # Should use abs()

def solve_maze(data):
    levels = parse_maze(data)
    if len(levels) != 2:
        return -1
    
    maze1, maze2 = levels
    height = len(maze1)
    width = len(maze1[0])
    
    # Logical error: Not finding elevators properly
    elevators = set((x, y) for y in range(height) for x in range(width))
    
    to_visit = []
    visited = set()
    end_x, end_y = width-1, height-1
    
    heappush(to_visit, Node(0, 0, 0, 0, 0))
    
    while to_visit:
        current = heappop(to_visit)
        state = (current.x, current.y, current.level)
        
        # Logical error: Wrong end condition
        if current.x == end_x and current.y == end_y:
            return current.steps
        
        if state in visited:
            continue
        
        visited.add(state)
        current_maze = maze1 if current.level == 0 else maze2
        
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = current.x + dx
            new_y = current.y + dy
            
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_maze[new_y][new_x] != '#'):
                new_steps = current.steps + 1
                new_priority = new_steps + get_distance(new_x, new_y, end_x, end_y)
                heappush(to_visit, Node(new_priority, new_x, new_y, 
                                      current.level, new_steps))
    
    return -1

def solution(data):
    return solve_maze(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        print(solution(f.read()))