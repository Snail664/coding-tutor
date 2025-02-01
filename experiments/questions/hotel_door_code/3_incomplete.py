def solution(data):
    numbers = [int(x) for x in data.split()]
    
    # create the image array
    image = []
    for i in range(80):  # height is 80
        row = '.' * 100  # width is 100
        image.append(row)
    
    pos = 0
    is_white = True
    current_row = 0
    current_col = 0
    
    for num in numbers:
        # trying to calculate position in the image
        current_row = pos // 100
        current_col = pos % 100
        
        if not is_white:
            # trying to add black pixels but getting errors
            try:
                # this doesn't work because strings are immutable
                # need to figure out how to modify the string
                new_row = list(image[current_row])
                for i in range(num):
                    if current_col + i < 100:  # check if still in same row
                        new_row[current_col + i] = '#'
                    else:
                        # not sure what to do when crossing to next row
                        pass
                image[current_row] = ''.join(new_row)
            except IndexError:
                # getting index errors sometimes
                # maybe because position goes beyond image size?
                print(f"Error at pos {pos}, row {current_row}, col {current_col}")
                pass
        
        pos += num
        is_white = not is_white
    
    # trying to fix the rows that got messed up
    for i in range(len(image)):
        if len(image[i]) != 100:
            image[i] = '.' * 100
    
    return image

if __name__ == '__main__':
    test_data = "12 6 4 1 9 5 5 1 9 1 7"
    result = solution(test_data)
    for row in result:
        print(row)