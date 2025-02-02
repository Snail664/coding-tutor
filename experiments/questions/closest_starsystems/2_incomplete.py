def distance(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2 + (p1[2] - p2[2])**2)**0.5

def closest_split_pair(px, py, pz, delta):
    n = len(px)
    mid = px[n//2][0]  # x-coordinate of middle point
    
    # TODO: Implement strip creation and checking
    return delta

def closest_pair(points):
    if len(points) <= 3:
        return min(distance(points[i], points[j]) 
                  for i in range(len(points)) 
                  for j in range(i + 1, len(points)))
    
    # Sort by each coordinate
    px = sorted(points, key=lambda x: x[0])
    py = sorted(points, key=lambda x: x[1])
    pz = sorted(points, key=lambda x: x[2])
    
    mid = len(points) // 2
    left = px[:mid]
    right = px[mid:]
    
    # TODO: Implement divide and conquer logic
    
    return float('inf')

def solution(data):
    points = []
    for star_data in data:
        parts = star_data.split(': ')[1].strip().split(',')
        x, y, z = float(parts[0]), float(parts[1]), float(parts[2])
        points.append([x, y, z])
    
    min_distance = closest_pair(points)
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