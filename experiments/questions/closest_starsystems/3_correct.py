class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kdtree(points, depth=0):
    if not points:
        return None
    
    k = 3  # 3D space
    axis = depth % k
    
    # Sort points by the current axis
    points.sort(key=lambda x: x[axis])
    median = len(points) // 2
    
    return KDNode(
        point=points[median],
        left=build_kdtree(points[:median], depth + 1),
        right=build_kdtree(points[median + 1:], depth + 1)
    )

def closest_point(root, point, depth=0, best=float('inf')):
    if root is None:
        return best
    
    k = 3
    axis = depth % k
    
    # Calculate current distance
    current_dist = sum((a - b)**2 for a, b in zip(root.point, point))**0.5
    if current_dist < best and current_dist > 0:  # Ignore same point
        best = current_dist
    
    # Determine which subtree to search
    if point[axis] < root.point[axis]:
        next_tree = root.left
        other_tree = root.right
    else:
        next_tree = root.right
        other_tree = root.left
    
    best = closest_point(next_tree, point, depth + 1, best)
    
    # Check if we need to search the other subtree
    if abs(root.point[axis] - point[axis]) < best:
        best = closest_point(other_tree, point, depth + 1, best)
    
    return best

def solution(data):
    # Parse input data into 3D coordinates
    points = []
    for line in data:
        # Split by ':' first, then by ',' and convert to float
        parts = line.split(': ')[1].strip().split(',')
        # Correctly using x, y, z coordinates (indices 0, 1, 2)
        points.append([float(parts[0]), float(parts[1]), float(parts[2])])
    
    # Build k-d tree
    root = build_kdtree(points[:])
    
    # Find closest pair
    min_distance = float('inf')
    for point in points:
        distance = closest_point(root, point)
        min_distance = min(min_distance, distance)
    
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