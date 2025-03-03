def solution(data):
    # Parse input data into list of coordinates
    stars = []
    for star_data in data:
        parts = star_data.split(': ')[1].strip().split(',')
        stars.append([float(parts[1]), float(parts[2]), float(parts[3])])

    # Initialize minimum distance as infinity
    min_distance = float('inf')

    # Compare each pair of stars
    for i in range(len(stars)):
        for j in range(i + 1, len(stars)):
            # Calculate Euclidean distance
            distance = ((stars[i][0] - stars[j][0])**2 +
                        (stars[i][1] - stars[j][1])**2 +
                        (stars[i][2] - stars[j][2])**2)**0.5
            min_distance = min(min_distance, distance)

    return round(min_distance, 3)
