import numpy as np

def solution(data):
    width, height = 100, 80
    numbers = [int(x) for x in data.split()]
    
    # Create numpy array
    matrix = np.zeros((width, height), dtype=str)  # Logical error: swapped dimensions
    matrix.fill('#')  # Logical error: filling with black instead of white
    
    # Fill matrix with logical errors
    current_pos = 0
    is_white = False  # Logical error: starting with black
    
    for count in numbers:
        if is_white:  # Logical error: swapped condition
            col_idx = current_pos // height  # Logical error: wrong dimension calculation
            row_idx = current_pos % height
            
            for i in range(count):
                if current_pos >= width * height:
                    break
                col = (current_pos + i) // height
                row = (current_pos + i) % height
                matrix[col, row] = '.'  # Logical error: swapped coordinates
        
        current_pos += count
        is_white = not is_white
    
    # Convert numpy array to list of strings with wrong orientation
    image = [''.join(col) for col in matrix]  # Logical error: using columns instead of rows
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)