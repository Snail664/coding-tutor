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

def bidirectional_search(data):
    """Attempt at bidirectional search (with bugs)"""
    levels = parse_levels(data)
    if len(levels) != 2:
        return -1
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Start from both ends
    start_queue = deque([(0, 0, 0, 0)])  # x, y, level, steps
    end_queue = deque([(width-1, height-1, 0, 0)])
    
    start_visited = {(0, 0, 0): 0}  # (x, y, level): steps
    end_visited = {(width-1, height-1, 0): 0}
    
    while start_queue and end_queue:
        # Process start side
        x, y, level, steps = start_queue.popleft()
        current_map = level1 if level == 0 else level2
        
        # Bug: Not properly checking for intersection with end_visited
        if (x, y, level) in end_visited:
            return steps + end_visited[(x, y, level)]
        
        # Try all directions
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x = x + dx
            new_y = y + dy
            
            if 0 <= new_x < width and 0 <= new_y < height:
                if current_map[new_y][new_x] != '#':
                    new_state = (new_x, new_y, level)
                    if new_state not in start_visited:
                        start_visited[new_state] = steps + 1
                        start_queue.append((new_x, new_y, level, steps + 1))
        
        # Bug: Incorrect elevator handling
        if current_map[y][x] == '$':
            new_level = 1 - level
            new_state = (x, y, new_level)
            if new_state not in start_visited:
                start_visited[new_state] = steps + 1
                start_queue.append((x, y, new_level, steps + 1))
        
        # Process end side (but with bugs)
        if end_queue:
            x, y, level, steps = end_queue.popleft()
            # Bug: Not processing end side properly
            current_map = level1 if level == 0 else level2
            
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                new_x = x + dx
                new_y = y + dy
                if 0 <= new_x < width and 0 <= new_y < height:
                    if current_map[new_y][new_x] != '#':
                        new_state = (new_x, new_y, level)
                        if new_state not in end_visited:
                            end_visited[new_state] = steps + 1
                            end_queue.append((new_x, new_y, level, steps + 1))
    
    return -1

def solution(data):
    return bidirectional_search(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))
