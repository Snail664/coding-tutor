def count_ways_iterative(target, segments):
    ways = 0
    max_40km = target // segments[0]
    
    for count_40km in range(max_40km + 1):
        remaining1 = target - (count_40km * segments[0])
        max_12km = remaining1 // segments[1]
        
        for count_12km in range(max_12km + 1):
            remaining2 = remaining1 - (count_12km * segments[1])
            max_2km = remaining2 // segments[2]
            
            for count_2km in range(max_2km + 1):
                remaining3 = remaining2 - (count_2km * segments[2])
                if remaining3 >= 0:
                    ways += 1
    
    return ways

def solution(data):
    numbers = list(map(int, data[0].split(',')))
    target = numbers[0]
    segments = numbers[1:]
    return count_ways_iterative(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")