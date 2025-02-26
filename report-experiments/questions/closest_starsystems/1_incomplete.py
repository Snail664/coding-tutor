def solution(data):
    # Parse input data into list of coordinates
    stars = []
    for star_data in data:
        parts = star_data.split(': ')[1].strip().split(',')
        stars.append([float(parts[1]), float(parts[2]), float(parts[3])])
