from collections import deque

def parse_levels(data):
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
    levels = parse_levels(data)
    if len(levels) != 2:
        return None
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Logical error: Not checking elevator positions
    queue = deque([(0, 0, 0, 0)])  # x, y, level, steps
    visited = set()
    
    while queue:
        x, y, level, steps = queue.popleft()
        
        # Logical error: Wrong target condition (should check level == 0)
        if (x, y) == (width-1, height-1):
            return steps
            
        if (x, y, level) in visited:
            continue
            
        visited.add((x, y, level))
        current_map = level1 if level == 0 else level2
        
        # Logical error: Always changing levels when moving
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = x + dx
            new_y = y + dy
            
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_map[new_y][new_x] != '#'):
                queue.append((new_x, new_y, 1 - level, steps + 1))
    
    return None

def solution(data):
    result = find_shortest_path(data)
    return result if result is not None else -1

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))