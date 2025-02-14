def solution(data):
    # Initialize request queue
    request_queue = []
    result = []
    
    # Process each command from input data
    for line in data[1:]:  # Skip the first line (number of commands)
        command = line.split()
        
        if command[0] == "add":
            # Add request to queue with complexity C and learning value L
            C, L = int(command[1]), int(command[2])
            request_queue.append((C, L))
            
        elif command[0] == "process":
            P = int(command[1])
            total_learning = 0
            remaining_capacity = P
            
            # Create a copy of request queue to modify
            available_requests = request_queue.copy()
            
            # Keep selecting requests while capacity remains and requests are available
            while remaining_capacity > 0 and available_requests:
                # Filter requests that can be processed with remaining capacity
                possible_requests = [(C, L) for C, L in available_requests if C <= remaining_capacity]
                
                if not possible_requests:
                    break
                    
                # Find request with max learning value (if tied, min complexity)
                selected_request = max(possible_requests, key=lambda x: (x[1], -x[0]))
                
                # Update capacity and learning value
                remaining_capacity -= selected_request[0]
                total_learning += selected_request[1]
                
                # Remove selected request from available requests
                available_requests.remove(selected_request)
            
            result.append(total_learning)
    
    return result