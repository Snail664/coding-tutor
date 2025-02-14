def count_ways_iterative(target, segments):
    ways = 0
    max_40km = target // segments[0]
    
    # Logical error: Wrong iteration order
    for count_2km in range(target // segments[2] + 1):
        remaining1 = target - (count_2km * segments[2])
        
        for count_40km in range(max_40km + 1):
            remaining2 = remaining1 - (count_40km * segments[0])
            max_12km = remaining2 // segments[1]
            
            # Logical error: Double counting some combinations
            for count_12km in range(max_12km + 1):
                remaining3 = remaining2 - (count_12km * segments[1])
                if remaining3 >= 0:
                    ways += 2  # Logical error: Counting each way twice
    
    return ways // 2  # Attempting to fix double counting

def solution(data):
    numbers = list(map(int, data[0].split(',')))
    target = numbers[0]
    segments = numbers[1:]
    return count_ways_iterative(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")
