class PlayfairGrid:
    def __init__(self, key):
        self.grid = self._create_grid(key)
    
    def _create_grid(self, key):
        # Create clean key without duplicates and j
        used_chars = set()
        grid_chars = []
        
        # Process key first
        for char in key.lower():
            if char == 'j':
                char = 'i'
            if char.isalpha() and char not in used_chars:
                used_chars.add(char)
                grid_chars.append(char)
        
        # Fill remaining alphabet
        alphabet = 'abcdefghiklmnopqrstuvwxyz'
        for char in alphabet:
            if char not in used_chars:
                grid_chars.append(char)
        
        # Convert to 5x5 grid
        return [grid_chars[i:i+5] for i in range(0, 25, 5)]
    
    def find_letter(self, letter):
        for row in range(5):
            for col in range(5):
                if self.grid[row][col] == letter:
                    return (row, col)
        return None

    def decode_pair(self, pair):
        row1, col1 = self.find_letter(pair[0])
        row2, col2 = self.find_letter(pair[1])
        
        if row1 == row2:  # Same row
            return (self.grid[row1][(col1-1)%5], 
                   self.grid[row2][(col2-1)%5])
        elif col1 == col2:  # Same column
            return (self.grid[(row1-1)%5][col1], 
                   self.grid[(row2-1)%5][col2])
        else:  # Rectangle case
            return (self.grid[row1][col2], 
                   self.grid[row2][col1])

def solution(data):
    key, message = data[0], data[1].lower()
    grid = PlayfairGrid(key)
    
    # Decode each word
    result = []
    for word in message.split():
        decoded_word = ''
        # Process pairs in word
        for i in range(0, len(word), 2):
            pair = word[i:i+2]
            a, b = grid.decode_pair(pair)
            decoded_word += a + b
        result.append(decoded_word)
    
    return ' '.join(result)


if __name__ == '__main__':
    def print_grid(grid):
        for row in grid.grid:
            print(' '.join(row))

    key1 = 'helloworld'
    grid1 = PlayfairGrid(key1)
    print("Playfair Grid:")
    print_grid(grid1)
    test1 = [key1, 'wp nehslv ewgw']
    print("Input:", test1)
    print("Output:", solution(test1))
    print()