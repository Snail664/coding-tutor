from heapq import heappush, heappop

def parse_maze(data):
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
    # Parse the maze levels
    levels = parse_maze(data)
    if len(levels) != 2:
        return -1
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Using A* search (but with mistakes)
    start = (0, 0, 0)  # x, y, level
    goal = (width-1, height-1, 0)
    
    # Priority queue for A* - (priority, x, y, level, steps)
    queue = [(0, 0, 0, 0, 0)]
    visited = set()
    
    while queue:
        _, x, y, level, steps = heappop(queue)
        current = (x, y, level)
        
        if current in visited:
            continue
            
        visited.add(current)
        
        # Incorrect: Not checking if we're at the goal properly
        if (x, y) == (width-1, height-1):
            return steps
        
        current_map = level1 if level == 0 else level2
        
        # Try moving in all directions
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = x + dx
            new_y = y + dy
            
            if 0 <= new_x < width and 0 <= new_y < height:
                # Bug: Not properly checking walls
                if current_map[new_y][new_x] != '#':
                    # Incorrect heuristic calculation
                    h = abs(new_x - width + 1) + abs(new_y - height + 1)
                    priority = steps + 1 + h
                    heappush(queue, (priority, new_x, new_y, level, steps + 1))
        
        # Bug: Always changing levels when on '$' without checking other level
        if current_map[y][x] == '$':
            new_level = 1 - level
            h = abs(x - width + 1) + abs(y - height + 1)
            priority = steps + 1 + h
            heappush(queue, (priority, x, y, new_level, steps + 1))
    
    return -1

def solution(data):
    return find_shortest_path(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))