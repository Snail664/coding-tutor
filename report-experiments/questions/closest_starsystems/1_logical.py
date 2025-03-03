def solution(data):
    stars = []
    for star_data in data:
        parts = star_data.split(': ')[1].strip().split(',')
        stars.append([float(parts[0]), float(parts[1]), float(parts[2])])

    min_distance = float('inf')

    for i in range(len(stars)):
        for j in range(i + 1, len(stars)):
            distance = ((stars[i][0] - stars[j][0])**2 +
                        (stars[i][1] - stars[j][1])**2 +
                        (stars[i][2] - stars[j][2])**2)**0.5
            min_distance = min(min_distance, distance)

    return round(min_distance, 3)
