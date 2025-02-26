def count_ways_recursive(target, segments, memo=None):
    if memo is None:
        memo = {}
    
    if target == 0:
        return 1
    if target < 0:
        return 0
    if target in memo:
        return memo[target]
    
    ways = 0
    # Logical error: Allowing reuse of same segment at same position
    for i, segment in enumerate(segments):
        # Logical error: Creating new segments list each time
        remaining_segments = segments[i:]
        ways += count_ways_recursive(target - segment, remaining_segments, memo)
    
    memo[target] = ways
    return ways

def solution(data):
    numbers = list(map(int, data[0].split(',')))
    target = numbers[0]
    segments = sorted(numbers[1:])  # Logical error: Unnecessary sorting
    return count_ways_recursive(target, segments)
if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")