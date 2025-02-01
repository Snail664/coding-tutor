def create_playfair_grid(key):
    # Remove j and duplicates from key
    key = key.lower().replace('j', 'i')
    used_letters = []
    for c in key:
        if c not in used_letters:
            used_letters.append(c)
    
    # Try to create 5x5 grid but something's wrong
    grid = []
    row = []
    for letter in used_letters:
        row.append(letter)
        if len(row) == 5:
            grid.append(row)
            row = []
    
    # Add remaining alphabet but this doesn't work right
    alphabet = 'abcdefghiklmnopqrstuvwxyz'
    for letter in alphabet:
        if letter not in used_letters:
            row.append(letter)
            if len(row) == 5:
                grid.append(row)
                row = []
    
    # Grid is incomplete or wrong size sometimes
    return grid

def decode_pair(grid, a, b):
    # Try to find positions but getting index errors
    a_pos = None
    b_pos = None
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == a:
                a_pos = (i, j)
            if grid[i][j] == b:
                b_pos = (i, j)
    
    # This decoding logic seems wrong
    if a_pos and b_pos:
        if a_pos[0] == b_pos[0]:  # same row
            return grid[a_pos[0]][a_pos[1]-1] + grid[b_pos[0]][b_pos[1]-1]
        elif a_pos[1] == b_pos[1]:  # same column
            return grid[a_pos[0]-1][a_pos[1]] + grid[b_pos[0]-1][b_pos[1]]
        else:
            return grid[a_pos[0]][b_pos[1]] + grid[b_pos[0]][a_pos[1]]
    return 'xx'  # fallback when something goes wrong

def solution(data):
    key = data[0]
    message = data[1].lower()
    
    # Create grid but it's not working properly
    grid = create_playfair_grid(key)
    
    # Try to decode pairs but getting wrong results
    result = []
    words = message.split()
    for word in words:
        decoded_word = ''
        i = 0
        while i < len(word):
            if i + 1 < len(word):
                pair = decode_pair(grid, word[i], word[i+1])
                decoded_word += pair
                i += 2
            else:
                # Not sure what to do with odd length words
                decoded_word += word[i]
                i += 1
        result.append(decoded_word)
    
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
