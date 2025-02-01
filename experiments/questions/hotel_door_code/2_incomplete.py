def solution(data):
    width = 100
    height = 80
    numbers = [int(x) for x in data.split()]
    
    # create empty image first
    image = []
    for i in range(height):
        row = ['.' for _ in range(width)]
        image.append(row)
    
    # trying to fill the image with numbers
    current_pos = 0
    is_white = True
    
    for num in numbers:
        # calculate row and column
        row = current_pos // width
        col = current_pos % width
        
        if not is_white:
            # trying to add black pixels
            for i in range(num):
                # not sure if this is correct
                # getting index errors sometimes
                if col + i < width:
                    image[row][col + i] = '#'
                else:
                    # what to do when reaching end of row?
                    pass
        
        current_pos += num
        is_white = not is_white
    
    # need to convert list of lists to list of strings
    # this part doesn't work yet
    result = []
    for row in image:
        try:
            result.append(''.join(row))
        except:
            # getting errors here
            result.append('.' * width)
    
    return result

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)
