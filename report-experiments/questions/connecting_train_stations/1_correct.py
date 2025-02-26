def count_ways_dp(target, segments):
    # Initialize dp array with 0s
    dp = [0] * (target + 1)
    dp[0] = 1  # Base case: one way to make 0
    
    # For each distance from 1 to target
    for distance in range(1, target + 1):
        # Try each segment length
        for segment in segments:
            if distance >= segment:
                dp[distance] += dp[distance - segment]
    
    return dp[target]

def solution(data):
    numbers = list(map(int, data.split(',')))
    target = numbers[0]  # First number is the target
    segments = numbers[1:]  # Remaining numbers 
    return count_ways_dp(target, segments)

if __name__ == '__main__':
    data = "856,40,12,1"
    result = solution(data)
    print(f"Number of different ways: {result}")

