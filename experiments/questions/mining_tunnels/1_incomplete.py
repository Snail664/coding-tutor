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

def find_shortest_path(data):
    """Find the shortest path from top-left to bottom-right through the maze."""
    levels = parse_levels(data)
    if len(levels) != 2:
        return None
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Find elevator positions
    elevators = []
    for i in range(height):
        for j in range(width):
            if level1[i][j] == '$':
                elevators.append((i, j))
    
    # BFS implementation (but with some logical errors)
    start = (0, 0, 0)  # (row, col, level)
    end = (height-1, width-1, 0)  # assuming we need to end on level 1
    queue = deque([(start, 0)])  # (position, steps)
    visited = {start}
    
    while queue:
        (row, col, current_level), steps = queue.popleft()
        
        # Check if we reached the end
        if (row, col, current_level) == end:
            return steps
        
        # Try moving in four directions
        for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_row = row + dr
            new_col = col + dc
            
            # Check bounds
            if 0 <= new_row < height and 0 <= new_col < width:
                # Check if we can move to this position
                maze = level1 if current_level == 0 else level2
                if maze[new_row][new_col] != '#':
                    new_pos = (new_row, new_col, current_level)
                    if new_pos not in visited:
                        visited.add(new_pos)
                        queue.append((new_pos, steps + 1))
        
        # Try using elevator if we're on one
        # This part is incomplete/incorrect - not handling level changes properly
        if (row, col) in elevators:
            new_level = 1 if current_level == 0 else 0
            new_pos = (row, col, new_level)
            if new_pos not in visited:
                visited.add(new_pos)
                queue.append((new_pos, steps + 1))
    
    return None

def solution(data):
    result = find_shortest_path(data)
    return result if result is not None else -1

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))