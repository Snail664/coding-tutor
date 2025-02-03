from collections import defaultdict
import heapq

def solution(data):
    # Initialize data structures
    energy_map = defaultdict(list)  # Maps energy to list of gold values
    result = []
    
    # Process commands (skip first line containing N)
    for line in data[1:]:
        cmd = line.split()
        
        if cmd[0] == "add":
            energy = int(cmd[1])
            gold = int(cmd[2])
            # Using negative gold for max heap behavior
            heapq.heappush(energy_map[energy], -gold)
            
        elif cmd[0] == "query":
            x = int(cmd[1])
            earnings = 0
            
            # While there's energy remaining and quests available
            while x > 0:
                # Find largest energy <= x
                possible_energies = [e for e in energy_map.keys() if e <= x]
                if not possible_energies:
                    break
                    
                largest_energy = max(possible_energies)
                
                # Get quest with highest gold for this energy
                if energy_map[largest_energy]:
                    gold = -heapq.heappop(energy_map[largest_energy])
                    earnings += gold
                    x -= largest_energy
                    
                    # Remove energy key if no more quests
                    if not energy_map[largest_energy]:
                        del energy_map[largest_energy]
                else:
                    break
                    
            result.append(earnings)
    
    return result