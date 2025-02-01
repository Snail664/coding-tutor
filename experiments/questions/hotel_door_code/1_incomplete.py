def solution(data):
    # insert your code below
    numbers = [int(x) for x in data.split()]
    pixels = []
    is_white = True
    
    # add dots and hashes based on the numbers
    for count in numbers:
        if is_white:
            pixels.extend('.' * count)
        else:
            pixels.extend('#' * count)
        is_white = not is_white
    
    # trying to convert to image
    image = []
    width, height = 100, 80
    
    current_pos = 0
    current_row = []
    for pixel in pixels:
        current_row.append(pixel)
        current_pos += 1
        if current_pos == width:
            image.append(''.join(current_row))
            current_row = []
            current_pos = 0
    
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)