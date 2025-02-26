def count_ways_recursive(target, segments, memo=None):
    # Incorrect: No memoization initialization
    if target == 0:
        return 1
    
    ways = 0
    for segment in segments:
        # Incorrect: No negative number check
        ways += count_ways_recursive(target - segment, segments, memo)
    
    return ways

def solution(data):
    # Incorrect: No error handling for input format
    target, *segments = map(int, data[0].split(','))
    return count_ways_recursive(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")
    