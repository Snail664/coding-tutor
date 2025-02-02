def solution(data):
    # Simple linear approach with logical errors
    numbers = [int(x) for x in data.split()]
    pixels = []
    is_white = False  # Logical error: starting with black instead of white
    
    # Build linear pixel array with wrong order
    for count in numbers:
        pixels.extend('#' * count if is_white else '.' * count)  # Logical error: swapped symbols
        is_white = not is_white
    
    # Convert to 2D image with wrong dimensions
    width, height = 80, 100  # Logical error: swapped dimensions
    image = []
    for i in range(0, height * width, width):
        row = ''.join(pixels[i:i + width])
        image.append(row)
    
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)
