from math import sqrt


def solution(data):
    closest_distance = 27
    for item in data:
        dims = item.split(":")[1].split(',')
        x_curr = float(dims[1])
        y_curr = float(dims[2])
        z_curr = float(dims[3])
        for other_item in data:
            if item == other_item:
                continue
            dims_other = other_item.split(":")[1].split(',')
            x_other = float(dims_other[1])
            y_other = float(dims_other[2])
            z_other = float(dims_other[3])
