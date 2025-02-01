class PlayfairGrid:
    def __init__(self, key):
        # Logical error: not handling key preprocessing
        self.grid = self.create_grid(key)
    
    def create_grid(self, key):
        # Logical error: wrong grid creation logic
        letters = list(key.lower())
        grid = []
        for i in range(0, 25, 5):
            if i + 5 <= len(letters):
                grid.append(letters[i:i+5])
            else:
                grid.append(['x'] * 5)
        return grid
    
    def find_letter(self, letter):
        # Logical error: incorrect position finding
        for i, row in enumerate(self.grid):
            if letter in row:
                return (i, row.index(letter))
        return (0, 0)  # Logical error: default position
    
    def decode_pair(self, pair):
        # Logical error: wrong decoding rules
        row1, col1 = self.find_letter(pair[0])
        row2, col2 = self.find_letter(pair[1])
        
        if row1 == row2:
            return (self.grid[row1][(col1+1)%5], 
                   self.grid[row2][(col2+1)%5])
        elif col1 == col2:
            return (self.grid[(row1+1)%5][col1], 
                   self.grid[(row2+1)%5][col2])
        return (self.grid[row1][col1], self.grid[row2][col2])

def solution(data):
    key, message = data[0], data[1]
    grid = PlayfairGrid(key)
    
    # Logical error: wrong message processing
    result = []
    for word in message.split():
        decoded = ''
        for i in range(0, len(word)-1, 2):
            a, b = grid.decode_pair(word[i:i+2])
            decoded += a + b
        result.append(decoded)
    
    return ' '.join(result)

if __name__ == '__main__':
    test_cases = [
        ('helloworld', 'wp nehslv ewgw'),
        ('cipher', 'te st me')
    ]
    
    for key, message in test_cases:
        print(f"\nTest: key='{key}', message='{message}'")
        result = solution([key, message])
        print(f"Result: {result}")