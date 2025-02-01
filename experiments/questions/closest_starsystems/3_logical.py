class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kdtree(points, depth=0):
    if not points:
        return None
    
    # Logical error 1: Using wrong dimension (2D instead of 3D)
    k = 2
    axis = depth % k
    
    # Logical error 2: Not sorting points before finding median
    median = len(points) // 2
    
    return KDNode(
        point=points[median],
        # Logical error 3: Swapped left and right subtrees
        right=build_kdtree(points[:median], depth + 1),
        left=build_kdtree(points[median + 1:], depth + 1)
    )

def closest_point(root, point, depth=0, best=float('inf')):
    if root is None:
        return best
    
    # Logical error 4: Using wrong dimension
    k = 2
    axis = depth % k
    
    # Logical error 5: Wrong distance calculation (using Manhattan distance)
    current_dist = sum(abs(a - b) for a, b in zip(root.point, point))
    # Logical error 6: Not ignoring same point
    if current_dist < best:
        best = current_dist
    
    # Logical error 7: Wrong comparison for tree traversal
    if point[axis] > root.point[axis]:
        next_tree = root.left
        other_tree = root.right
    else:
        next_tree = root.right
        other_tree = root.left
    
    best = closest_point(next_tree, point, depth + 1, best)
    
    # Logical error 8: Wrong condition for checking other subtree
    if root.point[axis] - point[axis] > best:
        best = closest_point(other_tree, point, depth + 1, best)
    
    return best

def solution(data):
    points = []
    for line in data:
        # Split by ':' first, then by ',' and convert to float
        parts = line.split(': ')[1].strip().split(',')
        # Correctly using x, y, z coordinates (indices 0, 1, 2)
        points.append([float(parts[0]), float(parts[1]), float(parts[2])])
    
    root = build_kdtree(points[:])
    
    # Logical error 9: Using maximum instead of minimum distance
    max_distance = float('-inf')
    for point in points:
        distance = closest_point(root, point)
        max_distance = max(max_distance, distance)
    
    return round(max_distance, 3)

if __name__ == '__main__':
    data = [
        "Proxima Centauri: 4.247, 2.945, -3.056, -0.143",
        "Barnard's star: 5.963, 4.958, 2.980, 1.449",
        "Luhman 16 A: 6.503, 1.697, -6.249, 0.600",
        "WISE J085510.83-071442.5: 7.532, -3.967, -5.664, 2.985",
        "Wolf 359: 7.856, -1.916, -3.938, 6.522"
    ]
    print(solution(data))