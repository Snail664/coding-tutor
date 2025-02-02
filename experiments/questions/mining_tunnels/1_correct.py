from collections import deque

def parse_levels(data):
    """Parse the levels from the input data."""
    levels = []
    current_level = []
    
    for line in data.strip().split('\n'):
        if line.strip() and line.strip().isdigit():
            if current_level:
                levels.append(current_level)
                current_level = []
        elif line.strip():
            current_level.append(list(line.strip()))
    
    if current_level:
        levels.append(current_level)
    
    return levels

# BFS to find shortest path
def find_shortest_path(data):
    """Find the shortest path from top-left to bottom-right through the maze."""
    # Parse the two levels from the input
    levels = parse_levels(data)
    if len(levels) != 2:
        return None
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Create a set of elevator positions
    elevators = set()
    for y in range(height):
        for x in range(width):
            if level1[y][x] == '$':
                elevators.add((x, y))
    
    # State: (x, y, level, steps)
    # level: 0 for level1, 1 for level2
    start = (0, 0, 0, 0)  # Start at top-left of level 1
    target = (width-1, height-1, 0)  # Target is bottom-right of level 1
    
    queue = deque([start])
    visited = set()  # (x, y, level)
    
    while queue:
        x, y, level, steps = queue.popleft()
        
        if (x, y, level) in visited:
            continue
            
        visited.add((x, y, level))
        
        # Check if we reached the target
        if (x, y, level) == target:
            return steps
        
        current_map = level1 if level == 0 else level2
        
        # Try all four directions
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = x + dx
            new_y = y + dy
            
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_map[new_y][new_x] != '#'):
                queue.append((new_x, new_y, level, steps + 1))
        
        # If we're on an elevator, try changing levels
        if (x, y) in elevators:
            queue.append((x, y, 1 - level, steps + 1))
    
    return None

def solution(data):
    result = find_shortest_path(data)
    return result if result is not None else -1

if __name__ == '__main__':
    # Read data from file
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))
