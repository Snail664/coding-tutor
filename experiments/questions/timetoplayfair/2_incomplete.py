class PlayfairGrid:
    def __init__(self, key):
        self.key = key.lower()
        self.grid = self._build_grid()
    
    def _build_grid(self):
        # Try to build grid but having issues with size
        used_chars = set()
        grid_chars = []
        
        # Add key chars first
        for c in self.key:
            if c != 'j' and c not in used_chars:
                used_chars.add(c)
                grid_chars.append(c)
        
        # Add remaining alphabet but something's wrong
        for c in 'abcdefghiklmnopqrstuvwxyz':
            if c not in used_chars:
                grid_chars.append(c)
        
        # Convert to 5x5 but getting wrong dimensions sometimes
        grid = []
        for i in range(0, min(25, len(grid_chars)), 5):
            row = grid_chars[i:i+5]
            # Pad row if it's short but this might be wrong
            while len(row) < 5:
                row.append('x')
            grid.append(row)
        return grid
    
    def find_letter(self, letter):
        # Search for letter but returns wrong positions sometimes
        for row_idx, row in enumerate(self.grid):
            try:
                col_idx = row.index(letter)
                return (row_idx, col_idx)
            except ValueError:
                continue
        # Not sure what to return if letter not found
        return (0, 0)
    
    def decode_pair(self, a, b):
        # This decoding logic isn't working right
        a_pos = self.find_letter(a)
        b_pos = self.find_letter(b)
        
        try:
            if a_pos[0] == b_pos[0]:  # Same row
                # This part seems wrong
                new_a = self.grid[a_pos[0]][(a_pos[1]-1) % 5]
                new_b = self.grid[b_pos[0]][(b_pos[1]-1) % 5]
                return new_a + new_b
            elif a_pos[1] == b_pos[1]:  # Same column
                # Getting index errors sometimes
                new_a = self.grid[(a_pos[0]-1) % 5][a_pos[1]]
                new_b = self.grid[(b_pos[0]-1) % 5][b_pos[1]]
                return new_a + new_b
            else:
                # Rectangle case but results look wrong
                return self.grid[a_pos[0]][b_pos[1]] + self.grid[b_pos[0]][a_pos[1]]
        except IndexError:
            return 'xx'

def solution(data):
    key, message = data[0], data[1].lower()
    grid = PlayfairGrid(key)
    
    # Try to decode message but getting weird results
    result = []
    for word in message.split():
        decoded = ''
        i = 0
        while i < len(word):
            if i + 1 < len(word):
                decoded += grid.decode_pair(word[i], word[i+1])
                i += 2
            else:
                # Not handling odd-length words correctly
                decoded += word[i] + 'x'
                i += 1
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
