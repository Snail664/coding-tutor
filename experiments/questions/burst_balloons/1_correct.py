def solution(data):
    # Handle empty input case first
    if not data:
        return 0
        
    # Add boundary elements
    data = [1] + data + [1]
    n = len(data)
    
    # Initialize dp table with 0s
    dp = [[0] * n for _ in range(n)]
    
    # Iterate over different window sizes
    for length in range(1, n-1):
        for left in range(1, n - length):
            right = left + length - 1
            
            # Try each balloon as the last one to burst
            for i in range(left, right + 1):
                coins = data[left-1] * data[i] * data[right+1]
                # Add coins from left and right subarrays
                if i > left:
                    coins += dp[left][i-1]
                if i < right:
                    coins += dp[i+1][right]
                dp[left][right] = max(dp[left][right], coins)
    
    return dp[1][n-2]

if __name__ == '__main__':
    data = [3,1,5,8,]
    print(solution(data))