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
    
    # Find elevator positions
    elevators = set()
    for y in range(height):
        for x in range(width):
            if level1[y][x] == '$':
                elevators.add((x, y))
    
    start = (0, 0, 0)  # (x, y, level)
    goal = (width-1, height-1, 0)
    
    # Two queues for bidirectional search
    forward_queue = deque([(start, 0)])  # (state, steps)
    backward_queue = deque([(goal, 0)])
    
    # Two sets of visited states
    forward_visited = {start: 0}  # state: steps
    backward_visited = {goal: 0}
    
    def expand_frontier(queue: deque, visited: Dict, other_visited: Dict) -> Optional[int]:
        if not queue:
            return None
            
        current_state, steps = queue.popleft()
        x, y, level = current_state
        current_map = level1 if level == 0 else level2
        
        # Try all four directions
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x, new_y = x + dx, y + dy
            
            if (0 <= new_x < width and 0 <= new_y < height and 
                current_map[new_y][new_x] != '#'):
                new_state = (new_x, new_y, level)
                new_steps = steps + 1
                
                if new_state not in visited or new_steps < visited[new_state]:
                    visited[new_state] = new_steps
                    queue.append((new_state, new_steps))
                    
                    # Check if we've found a meeting point
                    if new_state in other_visited:
                        return new_steps + other_visited[new_state]
        
        # Try elevator if available
        if (x, y) in elevators:
            new_state = (x, y, 1 - level)
            new_steps = steps + 1
            
            if new_state not in visited or new_steps < visited[new_state]:
                visited[new_state] = new_steps
                queue.append((new_state, new_steps))
                
                # Check if we've found a meeting point
                if new_state in other_visited:
                    return new_steps + other_visited[new_state]
        
        return None
    
    # Main bidirectional search loop
    while forward_queue and backward_queue:
        # Expand forward frontier
        result = expand_frontier(forward_queue, forward_visited, backward_visited)
        if result is not None:
            return result
            
        # Expand backward frontier
        result = expand_frontier(backward_queue, backward_visited, forward_visited)
        if result is not None:
            return result
    
    return -1

def solution(data: str) -> int:
    return bidirectional_search(data)

if __name__ == '__main__':
    with open('experiments/questions/mining_tunnels/levels.txt', 'r') as f:
        data = f.read()
    print(solution(data))