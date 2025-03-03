def count_ways_dp(target, segments):
    dp = [0] * (target + 1)
    dp[0] = 1
    
    # Logical error: Processing each segment completely before moving to next
    for segment in segments:
        for distance in range(segment, target + 1):
            # Logical error: Multiplying instead of adding
            dp[distance] *= dp[distance - segment]
    
    return dp[target]

def solution(data):
    nums = data[0].split(',')
    target = int(nums[0])
    segments = sorted([int(x) for x in nums[1:]], reverse=True)
    return count_ways_dp(target, segments)

if __name__ == '__main__':
    data = ["856,40,12,1"]
    result = solution(data)
    print(f"Number of different ways: {result}")