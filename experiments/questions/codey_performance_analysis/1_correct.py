from collections import defaultdict
import heapq

def solution(data):
    # Initialize data structures
    complexity_map = defaultdict(list)  # Maps complexity to list of learning values
    result = []
    
    # Process commands (skip first line containing N)
    for line in data[1:]:
        cmd = line.split()
        
        if cmd[0] == "add":
            complexity = int(cmd[1])
            learning_value = int(cmd[2])
            # Using negative learning value for max heap behavior
            heapq.heappush(complexity_map[complexity], (-learning_value, complexity))
            
        elif cmd[0] == "process":
            p = int(cmd[1])
            total_learning = 0
            
            # While there's processing capacity remaining and requests available
            while p > 0:
                # Find largest complexity <= p
                possible_complexities = [c for c in complexity_map.keys() if c <= p]
                if not possible_complexities:
                    break
                    
                largest_complexity = max(possible_complexities)
                
                # Get request with highest learning value for this complexity
                if complexity_map[largest_complexity]:
                    learning_value, complexity = heapq.heappop(complexity_map[largest_complexity])
                    total_learning += -learning_value
                    p -= complexity
                    
                    # Remove complexity key if no more requests
                    if not complexity_map[largest_complexity]:
                        del complexity_map[largest_complexity]
                else:
                    break
                    
            result.append(total_learning)
    
    return result