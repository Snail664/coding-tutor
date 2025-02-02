import numpy as np

def solution(data):
    width, height = 100, 80
    numbers = [int(x) for x in data.split()]
    
    # Create numpy array
    matrix = np.zeros((height, width), dtype=str)
    matrix.fill('.')
    
    # Fill matrix
    current_pos = 0
    is_white = True
    
    for count in numbers:
        if not is_white:
            row_idx = current_pos // width
            col_idx = current_pos % width
            
            for i in range(count):
                if current_pos >= width * height:
                    break
                row = (current_pos + i) // width
                col = (current_pos + i) % width
                matrix[row, col] = '#'
        
        current_pos += count
        is_white = not is_white
    
    # Convert numpy array to list of strings
    image = [''.join(row) for row in matrix]
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"  # Example that produces 'F'
    result = solution(test_data)
    for row in result:  # Display the image
        print(row)