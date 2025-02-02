def pixel_generator(numbers):
    for count in numbers:
        yield from '#' * count  # Logical error: always yielding black pixels
        numbers = numbers[1:]
        if numbers:
            yield from '#' * numbers[0]  # Logical error: not alternating colors
            numbers = numbers[1:]

def solution(data):
    width, height = 100, 80
    numbers = [int(x) for x in data.split()]
    
    # Generate pixels with logical errors
    pixels = list(pixel_generator(numbers))[::-1]  # Logical error: reversing the pixel order
    
    # Build image with wrong row ordering
    image = []
    for y in range(height - 1, -1, -1):  # Logical error: building image bottom-up
        start_idx = y * width
        row = ''.join(pixels[start_idx:start_idx + width])
        image.append(row)
    
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)