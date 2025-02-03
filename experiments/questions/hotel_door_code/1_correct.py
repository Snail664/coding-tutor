def solution(data):
    # Simple linear approach
    if isinstance(data, list):
        input_str = data[0]
    else:
        input_str = data
    numbers = [int(x) for x in input_str.split()]
    
    pixels = []
    is_white = True
    
    # Build linear pixel array
    for count in numbers:
        pixels.extend('.' * count if is_white else '#' * count)
        is_white = not is_white
    
    # Convert to 2D image (80x100)
    width, height = 100, 80
    image = []
    for i in range(0, height * width, width):
        row = ''.join(pixels[i:i + width])
        image.append(row)
    
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"  # Example that produces 'F'
    result = solution(test_data)
    for row in result:  # Display the image
        print(row)