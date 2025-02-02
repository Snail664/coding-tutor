def create_playfair_grid(key):
    # Remove duplicates and 'j', replace with 'i'
    key = key.lower().replace('j', 'i')
    grid_letters = []
    # Add key letters first (no duplicates)
    for char in key:
        if char.isalpha() and char not in grid_letters:
            grid_letters.append(char)
    
    # Add remaining alphabet
    for char in 'abcdefghiklmnopqrstuvwxyz':  # note: no 'j'
        if char not in grid_letters:
            grid_letters.append(char)
    
    # Create 5x5 grid
    grid = []
    for i in range(0, 25, 5):
        grid.append(grid_letters[i:i+5])
    return grid

def find_position(grid, letter):
    for row in range(5):
        for col in range(5):
            if grid[row][col] == letter:
                return row, col
    return None

def decode_pair(grid, pair):
    row1, col1 = find_position(grid, pair[0])
    row2, col2 = find_position(grid, pair[1])
    
    if row1 == row2:  # Same row
        return (grid[row1][(col1-1)%5], grid[row2][(col2-1)%5])
    elif col1 == col2:  # Same column
        return (grid[(row1-1)%5][col1], grid[(row2-1)%5][col2])
    else:  # Rectangle case
        return (grid[row1][col2], grid[row2][col1])

def solution(data):
    # Get key and encoded message from input
    key = data[0]
    message = data[1].lower()
    
    # Create the Playfair grid
    grid = create_playfair_grid(key)
    
    # Process message in pairs
    decoded = []
    words = message.split()
    
    for word in words:
        # Process each word
        pairs = [word[i:i+2] for i in range(0, len(word), 2)]
        decoded_word = ''
        
        for pair in pairs:
            a, b = decode_pair(grid, pair)
            decoded_word += a + b
            
        decoded.append(decoded_word)
    
    return ' '.join(decoded)


if __name__ == '__main__':
    test1 = ['helloworld', 'wp nehslv ewgw']
    print("Test 1 (Example from question):")
    print("Input:", test1)
    print("Output:", solution(test1))
