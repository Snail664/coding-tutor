def distance(p1, p2):
    # Logical error 1: Using addition instead of subtraction
    return ((p1[0] + p2[0])**2 + (p1[1] + p2[1])**2 + (p1[2] + p2[2])**2)**0.5

def closest_split_pair(px, py, pz, delta):
    n = len(px)
    mid = px[n//2][0]  # x-coordinate of middle point
    
    # Logical error 2: Wrong strip condition (using addition instead of absolute difference)
    strip = [p for p in py if p[0] + mid <= delta]
    
    min_dist = delta
    for i in range(len(strip)):
        # Logical error 3: Comparing with all points instead of next 7
        for j in range(i+1, len(strip)):
            dist = distance(strip[i], strip[j])
            # Logical error 4: Using max instead of min
            min_dist = max(min_dist, dist)
    return min_dist

def closest_pair(points):
    if len(points) <= 3:
        # Logical error 5: Wrong base case handling
        return max(distance(points[i], points[j]) 
                  for i in range(len(points)) 
                  for j in range(i + 1, len(points)))
    
    # Sort by each coordinate
    px = sorted(points, key=lambda x: x[0])
    py = sorted(points, key=lambda x: x[1])
    pz = sorted(points, key=lambda x: x[2])
    
    mid = len(points) // 2
    left = px[:mid]
    right = px[mid:]
    
    delta_left = closest_pair(left)
    delta_right = closest_pair(right)
    # Logical error 6: Using max instead of min
    delta = max(delta_left, delta_right)
    
    return max(delta, closest_split_pair(px, py, pz, delta))

def solution(data):
    points = []
    for star_data in data:
        # Logical error 7: Using wrong indices
        parts = star_data.split(': ')[1].strip().split(',')
        x, y, z = float(parts[1]), float(parts[2]), float(parts[3])
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