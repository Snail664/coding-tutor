def solution(data):
    stars_dict = {}
    for star_entry in data:
        star_name, coords_str = star_entry.split('| ')
        dist, x_str, y_str, z_str = coords_str.strip().split(',')
        stars_dict[star_name] = [float(x_str), float(y_str), float(z_str)]

    star_names = list(stars_dict.keys())

    min_distance = float('inf')

    i = 0
    while i < len(star_names) - 1:
        j = i + 1
        while j < len(star_names):
            x1, y1, z1 = stars_dict[star_names[i]]
            x2, y2, z2 = stars_dict[star_names[j]]
            distance = ((x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2)**0.5

            if distance < min_distance:
                min_distance = distance
            j += 1
        i += 1

    return round(min_distance, 3)
