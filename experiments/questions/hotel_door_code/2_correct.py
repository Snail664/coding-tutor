def pixel_generator(numbers):
    for count in numbers:
        yield from '.' * count
        numbers = numbers[1:]  # Move to next number
        if numbers:  # If there are more numbers
            yield from '#' * numbers[0]
            numbers = numbers[1:]

def solution(data):
    width, height = 100, 80
    numbers = [int(x) for x in data.split()]
    
    # Generate pixels using generator
    pixels = list(pixel_generator(numbers))
    
    # Build and display image
    image = []
    for y in range(height):
        start_idx = y * width
        row = ''.join(pixels[start_idx:start_idx + width])
        image.append(row)
        
    return image
    
    # return "F"  

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"  # Example that produces 'F'
    result = solution(test_data)
    for row in result:  # Display the image
        print(row)