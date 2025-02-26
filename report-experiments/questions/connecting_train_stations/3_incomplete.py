def count_ways_iterative(target, segments):
    ways = 0
    # Incorrect: Off-by-one error in maximum calculations
    max_40km = (target // segments[0]) - 1
    
    for count_40km in range(max_40km):
        remaining1 = target - (count_40km * segments[0])
        max_12km = remaining1 // segments[1]
        
        # Incorrect: Missing proper bounds checking
        for count_12km in range(max_12km):
            remaining2 = remaining1 - (count_12km * segments[1])
            ways += remaining2  # Incorrect: Wrong counting logic
    
    return ways

def solution(data):
    target, *segments = map(int, data[0].split(','))
    return count_ways_iterative(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")