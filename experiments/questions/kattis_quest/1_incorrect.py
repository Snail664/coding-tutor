def solution(data):
    # Initialize quest pool
    quest_pool = []
    result = []
    
    # Process each command from input data
    for line in data:
        command = line.split()
        
        if command[0] == "add":
            # Add quest to pool with energy E and gold G
            E, G = int(command[1]), int(command[2])
            quest_pool.append((E, G))
            
        elif command[0] == "query":
            X = int(command[1])
            total_gold = 0
            remaining_energy = X
            
            # Create a copy of quest pool to modify
            available_quests = quest_pool.copy()
            
            # Keep selecting quests while energy remains and quests are available
            while remaining_energy > 0 and available_quests:
                # Filter quests that can be completed with remaining energy
                possible_quests = [(E, G) for E, G in available_quests if E <= remaining_energy]
                
                if not possible_quests:
                    break
                    
                # Find quest with max energy (if tied, max gold)
                selected_quest = max(possible_quests, key=lambda x: (x[0], x[1]))
                
                # Update energy and gold
                remaining_energy -= selected_quest[0]
                total_gold += selected_quest[1]
                
                # Remove selected quest from available quests
                available_quests.remove(selected_quest)
            
            result.append(total_gold)
    
    return result

if __name__ == '__main__':
    data = [
        "9",
        "add 8 10",
        "add 3 25",
        "add 5 6",
        "query 7",
        "query 7",
        "add 1 9",
        "add 2 13",
        "query 20",
        "query 1"
    ]
    print('\n'.join(map(str, solution(data))))