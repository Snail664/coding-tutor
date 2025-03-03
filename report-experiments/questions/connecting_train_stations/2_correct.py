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
    for segment in segments:
        ways += count_ways_recursive(target - segment, segments, memo)
    
    memo[target] = ways
    return ways

def solution(data):
    numbers = list(map(int, data[0].split(',')))
    target = numbers[0]
    segments = numbers[1:]
    return count_ways_recursive(target, segments)

if __name__ == '__main__':
    result = solution(["856,40,12,1"])
    print(f"Number of different ways: {result}")
