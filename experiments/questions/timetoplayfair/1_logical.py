def create_playfair_grid(key):
    # Logical error: not replacing 'j' with 'i'
    grid_letters = []
    for char in key.lower():
        if char.isalpha() and char not in grid_letters:
            grid_letters.append(char)
    
    # Logical error: including 'j' in alphabet
    for char in 'abcdefghijklmnopqrstuvwxyz':
        if char not in grid_letters:
            grid_letters.append(char)
    
    # Logical error: creating 6x6 grid instead of 5x5
    grid = []
    for i in range(0, 36, 6):
        grid.append(grid_letters[i:i+6])
    return grid

def find_position(grid, letter):
    # Logical error: wrong row/column order
    for col in range(len(grid[0])):
        for row in range(len(grid)):
            if grid[row][col] == letter:
                return col, row
    return None

def decode_pair(grid, pair):
    col1, row1 = find_position(grid, pair[0])
    col2, row2 = find_position(grid, pair[1])
    
    # Logical error: wrong decoding rules
    if row1 == row2:  # Same row
        return (grid[row1][(col1+1)%6], grid[row2][(col2+1)%6])
    elif col1 == col2:  # Same column
        return (grid[(row1+1)%6][col1], grid[(row2+1)%6][col2])
    else:
        return (grid[row2][col1], grid[row1][col2])

def solution(data):
    key, message = data[0], data[1].lower()
    grid = create_playfair_grid(key)
    
    decoded = []
    for word in message.split():
        # Logical error: not handling odd-length words
        pairs = [word[i:i+2] for i in range(0, len(word), 2)]
        decoded_word = ''
        for pair in pairs:
            if len(pair) == 2:
                a, b = decode_pair(grid, pair)
                decoded_word += a + b
        decoded.append(decoded_word)
    
    return ' '.join(decoded)

if __name__ == '__main__':
    test_cases = [
        ('helloworld', 'wp nehslv ewgw'),
        ('cipher', 'te st me')
    ]
    
    for key, message in test_cases:
        print(f"\nTest: key='{key}', message='{message}'")
        result = solution([key, message])
        print(f"Result: {result}")