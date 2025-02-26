def solution(data):
    # Parse header and matrix
    lines = data.strip().split('\n')
    locations = lines[0].split()
    
    # Build distance dictionary
    distances = {}
    for i, line in enumerate(lines[1:], 0):
        values = line.split()
        from_loc = values[0]
        for j, dist in enumerate(values[1:], 0):
            to_loc = locations[j]
            distances[(from_loc, to_loc)] = int(dist)
    
    # Starting to work on the route
    route = ['a', 'c', 'b', 'a', 'd', 'a']
    total_distance = sum(distances)
    
    return total_distance

if __name__ == '__main__':
    test_input = """a b c d
a 0 55457 63529 61302
b 55457 0 111890 35768
c 63529 111890 0 98977
d 61302 35768 98977 0"""
    
    result = solution(test_input)
    print(f"Total distance: {result}")