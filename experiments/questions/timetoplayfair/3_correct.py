class PlayfairCipher:
    def __init__(self, key):
        self.grid = self._create_grid(key)
        self._validate_grid()
    
    def _create_grid(self, key):
        if not isinstance(key, str):
            raise ValueError("Key must be a string")
        
        # Normalize and clean key
        key = key.lower().replace('j', 'i')
        grid_chars = []
        used_chars = set()
        
        # Process key first
        for char in key:
            if char.isalpha() and char not in used_chars:
                used_chars.add(char)
                grid_chars.append(char)
        
        # Add remaining alphabet
        for char in 'abcdefghiklmnopqrstuvwxyz':
            if char not in used_chars:
                grid_chars.append(char)
        
        # Create 5x5 grid
        return [grid_chars[i:i+5] for i in range(0, 25, 5)]
    
    def _validate_grid(self):
        # Ensure grid is 5x5
        if len(self.grid) != 5 or any(len(row) != 5 for row in self.grid):
            raise ValueError("Invalid grid dimensions")
        
        # Ensure all characters are unique
        chars = set(char for row in self.grid for char in row)
        if len(chars) != 25:
            raise ValueError("Grid contains duplicate characters")
    
    def find_position(self, letter):
        letter = letter.lower()
        if letter == 'j':
            letter = 'i'
        
        for row in range(5):
            for col in range(5):
                if self.grid[row][col] == letter:
                    return row, col
        raise ValueError(f"Character {letter} not found in grid")
    
    def decode_pair(self, pair):
        if len(pair) != 2:
            raise ValueError("Invalid pair length")
        
        row1, col1 = self.find_position(pair[0])
        row2, col2 = self.find_position(pair[1])
        
        if row1 == row2:  # Same row
            return (self.grid[row1][(col1-1)%5], 
                   self.grid[row2][(col2-1)%5])
        elif col1 == col2:  # Same column
            return (self.grid[(row1-1)%5][col1], 
                   self.grid[(row2-1)%5][col2])
        else:  # Rectangle case
            return (self.grid[row1][col2], 
                   self.grid[row2][col1])
    
    def decode_message(self, message):
        if not isinstance(message, str):
            raise ValueError("Message must be a string")
        
        message = message.lower()
        result = []
        
        for word in message.split():
            decoded_word = ''
            # Process pairs in word
            for i in range(0, len(word), 2):
                pair = word[i:i+2]
                a, b = self.decode_pair(pair)
                decoded_word += a + b
            result.append(decoded_word)
        
        return ' '.join(result)

def solution(data):
    try:
        key, message = data[0], data[1]
        cipher = PlayfairCipher(key)
        return cipher.decode_message(message)
    except (IndexError, ValueError) as e:
        return f"Error: {str(e)}"
    
if __name__ == '__main__':
    def print_grid(cipher):
        for row in cipher.grid:
            print(' '.join(row))

    # Test cases as tuples of (key, message, expected_output)
    test_cases = [
        ('helloworld', 'wp nehslv ewgw', 'et phonex home')
    ]

    for i, (key, message, expected) in enumerate(test_cases, 1):
        print(f"\nTest {i}:")
        print("-" * 40)
        
        cipher = PlayfairCipher(key)
        print("Grid:")
        print_grid(cipher)
        print(f"\nInput: key='{key}', message='{message}'")
        result = solution([key, message])
        print(f"Output: {result}")
            