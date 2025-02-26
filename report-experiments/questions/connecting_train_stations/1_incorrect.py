def count_ways_dp(target, segments):
    # Incorrect: Initialize with 1s instead of 0s
    dp = [1] * (target + 1)
    
    for distance in range(1, target + 1):
        for segment in segments:
            # Incorrect: Missing proper distance check
            dp[distance] += dp[distance - segment]
    
    return dp[target]

def solution(data):
    # Incorrect: Not handling potential invalid input
    numbers = data[0].split(',')
    target = int(numbers[0])
    segments = [int(x) for x in numbers[1:]]
    return count_ways_dp(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")