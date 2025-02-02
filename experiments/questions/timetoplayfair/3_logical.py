class PlayfairCipher:
    def __init__(self, key):
        # Logical error: not removing duplicates from key
        self.key = key.lower()
        self.grid = self.create_grid()
    
    def create_grid(self):
        # Logical error: wrong grid creation
        grid = [['' for _ in range(5)] for _ in range(5)]
        chars = list(self.key) + list('abcdefghiklmnopqrstuvwxyz')
        pos = 0
        
        for i in range(5):
            for j in range(5):
                # Logical error: not checking for duplicates
                if pos < len(chars):
                    grid[i][j] = chars[pos]
                    pos += 1
        return grid
    
    def find_positions(self, pair):
        # Logical error: incorrect position finding
        positions = []
        for char in pair:
            found = False
            for i in range(5):
                for j in range(5):
                    if self.grid[i][j] == char:
                        positions.append((i, j))
                        found = True
                        break
                if found:
                    break
            if not found:
                positions.append((0, 0))  # Logical error: default position
        return positions
    
    def decode(self, message):
        # Logical error: wrong decoding logic
        result = []
        for word in message.split():
            decoded = ''
            for i in range(0, len(word), 2):
                if i + 1 < len(word):
                    pos1, pos2 = self.find_positions(word[i:i+2])
                    if pos1[0] == pos2[0]:  # Same row
                        decoded += self.grid[pos1[0]][(pos1[1]+1)%5]
                        decoded += self.grid[pos2[0]][(pos2[1]+1)%5]
                    elif pos1[1] == pos2[1]:  # Same column
                        decoded += self.grid[(pos1[0]+1)%5][pos1[1]]
                        decoded += self.grid[(pos2[0]+1)%5][pos2[1]]
                    else:
                        decoded += self.grid[pos1[0]][pos1[1]]
                        decoded += self.grid[pos2[0]][pos2[1]]
            result.append(decoded)
        return ' '.join(result)

def solution(data):
    key, message = data[0], data[1].lower()
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