def solution(data):
    stars = []
    for star_data in data:
        # Logical error 1: Using the distance value instead of x,y,z coordinates
        parts = star_data.split(': ')[1].strip().split(',')
        stars.append([float(parts[1]), float(parts[2]), float(parts[3])])
    
    min_distance = float('inf')
    
    # Compare each pair of stars
    for i in range(len(stars)):
        for j in range(i + 1, len(stars)):
            distance = ((stars[i][0] + stars[j][0])**2 + 
                       (stars[i][1] + stars[j][1])**2 + 
                       (stars[i][2] + stars[j][2])**2)**0.5
            min_distance = max(min_distance, distance)
    
    return round(min_distance, 3)

if __name__ == '__main__':
    data = [
        "Proxima Centauri: 4.247, 2.945, -3.056, -0.143",
        "Barnard's star: 5.963, 4.958, 2.980, 1.449",
        "Luhman 16 A: 6.503, 1.697, -6.249, 0.600",
        "WISE J085510.83-071442.5: 7.532, -3.967, -5.664, 2.985",
        "Wolf 359: 7.856, -1.916, -3.938, 6.522"
    ]
    print(solution(data))