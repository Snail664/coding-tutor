def solution(data):
    # Parse input into matrix
    lines = data.strip().split('\n')
    locations = lines[0].split()
    loc_to_idx = {loc: idx for idx, loc in enumerate(locations)}
    
    # Build adjacency matrix
    n = len(locations)
    matrix = [[0] * n for _ in range(n)]
    for i, line in enumerate(lines[1:], 0):
        values = line.split()
        for j, dist in enumerate(values[1:], 0):
            matrix[i][j] = int(dist)
    
    route = ['a', 'c', 'b', 'a', 'd', 'a']
    total_distance = 0
    
    # Convert route locations to matrix indices
    route_indices = [loc_to_idx[loc] for loc in route]

    for idx in range(len(route_indices) - 1):
        current = route_indices[idx]
        next_idx = route_indices[idx + 1]
        # Maybe need to swap current/next_idx?
        distance = matrix[next_idx][current]
        total_distance += distance
    
    return total_distance

if __name__ == '__main__':
    test_input = """a b c d
a 0 55457 63529 61302
b 55457 0 111890 35768
c 63529 111890 0 98977
d 61302 35768 98977 0"""
    
    result = solution(test_input)
    print(f"Total distance: {result}")