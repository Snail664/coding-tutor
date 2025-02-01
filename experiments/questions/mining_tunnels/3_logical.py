from collections import deque
from typing import List, Set, Dict, Tuple, Optional

def parse_levels(data: str) -> List[List[List[str]]]:
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

def bidirectional_search(data: str) -> int:
    levels = parse_levels(data)
    if len(levels) != 2:
        return -1
    
    level1, level2 = levels
    height = len(level1)
    width = len(level1[0])
    
    # Logical error: Not checking for elevators
    elevators = set()
    
    # Logical error: Wrong start/end states
    start = (0, 0, 1)  # Should start at level 0
    goal = (width-1, height-1, 1)  # Should end at level 0
    
    forward_queue = deque([(start, 0)])
    backward_queue = deque([(goal, 0)])
    
    forward_visited = {start: 0}
    backward_visited = {goal: 0}
    
    # Logical error: Wrong expansion logic
    while forward_queue and backward_queue:
        current_state, steps = forward_queue.popleft()
        x, y, level = current_state
        current_map = level1 if level == 0 else level2
        
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x, new_y = x + dx, y + dy
            
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_map[new_y][new_x] != '#'):
                new_state = (new_x, new_y, level)
                new_steps = steps + 1
                
                if new_state not in forward_visited:
                    forward_visited[new_state] = new_steps
                    forward_queue.append((new_state, new_steps))
                    
                    if new_state in backward_visited:
                        return new_steps + backward_visited[new_state]
        
        # Logical error: Not properly handling backward search
        if backward_queue:
            backward_queue.popleft()
    
    return -1

def solution(data: str) -> int:
    return bidirectional_search(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))