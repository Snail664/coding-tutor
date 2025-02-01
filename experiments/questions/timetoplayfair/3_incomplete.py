class PlayfairCipher:
    def __init__(self, key):
        self.key = key.lower().replace('j', 'i')
        self.grid = self._create_grid()
        self._debug_print_grid()  # Added for debugging
    
    def _debug_print_grid(self):
        print("\nGrid:")
        for row in self.grid:
            print(' '.join(row))
    
    def _create_grid(self):
        # Trying to implement grid creation but having issues
        unique_chars = []
        # Add key chars first, removing duplicates
        for c in self.key:
            if c.isalpha() and c not in unique_chars:
                unique_chars.append(c)
        
        # Add remaining alphabet but getting extra characters somehow
        remaining = [c for c in 'abcdefghiklmnopqrstuvwxyz' 
                    if c not in unique_chars]
        all_chars = unique_chars + remaining
        
        # Create grid but dimensions are wrong sometimes
        grid = []
        for i in range(0, len(all_chars), 5):
            row = all_chars[i:i+5]
            if len(row) < 5:  # Pad short rows but might be wrong
                row.extend(['x'] * (5 - len(row)))
            grid.append(row)
        
        return grid
    
    def _find_positions(self, pair):
        # Search for letters but positions seem incorrect
        positions = []
        for char in pair:
            found = False
            for i, row in enumerate(self.grid):
                if char in row:
                    j = row.index(char)
                    positions.append((i, j))
                    found = True
                    break
            if not found:  # Not sure what to do if letter not found
                positions.append((0, 0))
        return positions
    
    def _decode_pair(self, pair):
        try:
            pos1, pos2 = self._find_positions(pair)
            
            # Decoding logic seems wrong
            if pos1[0] == pos2[0]:  # Same row
                return (self.grid[pos1[0]][(pos1[1]-1)%5] + 
                       self.grid[pos2[0]][(pos2[1]-1)%5])
            elif pos1[1] == pos2[1]:  # Same column
                return (self.grid[(pos1[0]-1)%5][pos1[1]] + 
                       self.grid[(pos2[0]-1)%5][pos2[1]])
            else:
                # Rectangle case but getting wrong results
                return (self.grid[pos1[0]][pos2[1]] + 
                       self.grid[pos2[0]][pos1[1]])
        except Exception as e:
            print(f"Error decoding pair {pair}: {e}")
            return 'xx'
    
    def decode(self, message):
        # Process message but output looks wrong
        words = message.lower().split()
        result = []
        
        for word in words:
            decoded_word = ''
            # Split into pairs but not handling odd lengths well
            pairs = [word[i:i+2] for i in range(0, len(word), 2)]
            for pair in pairs:
                if len(pair) == 2:
                    decoded_word += self._decode_pair(pair)
                else:
                    # Not sure how to handle single letters
                    decoded_word += pair + 'x'
            result.append(decoded_word)
        
        return ' '.join(result)

def solution(data):
    key, message = data[0], data[1]
    cipher = PlayfairCipher(key)
    return cipher.decode(message)

if __name__ == '__main__':
    test_cases = [
        ('helloworld', 'wp nehslv ewgw'),
        ('cipher', 'te st me')
    ]
    
    for key, message in test_cases:
        print(f"\nTest: key='{key}', message='{message}'")
        result = solution([key, message])
        print(f"Result: {result}")
