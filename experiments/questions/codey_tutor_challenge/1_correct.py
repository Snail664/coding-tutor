from collections import defaultdict
import heapq

def solution(data):
    # Initialize data structures: maps question consumption Q to a list (max heap) of rewards R
    consumption_map = defaultdict(list)
    result = []
    
    # Process commands (skip the first line containing N)
    for line in data[1:]:
        cmd = line.split()
        
        if cmd[0] == "add":
            # Add a new student query with question consumption Q and monetary reward R into the queue
            consumption = int(cmd[1])
            reward = int(cmd[2])
            # Use negative reward for max-heap behavior
            heapq.heappush(consumption_map[consumption], -reward)
            
        elif cmd[0] == "tutor":
            quota = int(cmd[1])
            total_reward = 0
            
            # While there is quota remaining and queries available
            while quota > 0:
                # Find all query consumptions that can be answered with the remaining quota
                possible_consumptions = [q for q in consumption_map.keys() if q <= quota]
                if not possible_consumptions:
                    break
                    
                # Choose the query with the largest consumption (if tied, the one with highest reward is handled by the heap)
                max_consumption = max(possible_consumptions)
                
                # Get the query with the highest reward for that consumption
                if consumption_map[max_consumption]:
                    reward_val = -heapq.heappop(consumption_map[max_consumption])
                    total_reward += reward_val
                    quota -= max_consumption
                    
                    # Remove the consumption key if no more queries remain for that consumption
                    if not consumption_map[max_consumption]:
                        del consumption_map[max_consumption]
                else:
                    break
            
            result.append(total_reward)
    
    return result

if __name__ == '__main__':
    data = [
        "9",
        "add 8 10",
        "add 3 25",
        "add 5 6",
        "tutor 7",
        "tutor 7",
        "add 1 9",
        "add 2 13",
        "tutor 20",
        "tutor 1"
    ]
    print(solution(data))
