def solution(data):
    stars = []
    print("\nParsing star coordinates:")
    for star_data in data:
        name = star_data.split(':')[0]
        parts = star_data.split(': ')[1].strip().split(',')
        coords = []
        for i in range(1, 4):  # Using indices 1, 2, and 3
            part = parts[i].strip()
            coords.append(float(part))
        print(f"{name}: {coords}")
        stars.append(coords)
    
    print("\nCalculating distances between all pairs:")
    min_distance = float('inf')
    min_pair = None
    for i in range(len(stars)):
        for j in range(i + 1, len(stars)):
            # Calculate each component separately for debugging
            dx = stars[i][0] - stars[j][0]
            dy = stars[i][1] - stars[j][1]
            dz = stars[i][2] - stars[j][2]
            distance = (dx*dx + dy*dy + dz*dz)**0.5
            print(f"Distance between {stars[i]} and {stars[j]}: {distance}")
            if distance < min_distance:
                min_distance = distance
                min_pair = (i, j)
    
    print(f"\nMinimum distance found: {round(min_distance, 3)}")
    if min_pair:
        print(f"Between stars: {stars[min_pair[0]]} and {stars[min_pair[1]]}")
    
    return round(min_distance, 3)







