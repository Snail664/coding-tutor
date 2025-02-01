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
    
    # TODO: Implement recursive tree building
    return KDNode(point=points[median])

def closest_point(root, point, depth=0, best=float('inf')):
    if root is None:
        return best
    
    k = 3
    axis = depth % k
    
    return best

def solution(data):
    points = []
    for line in data:
        # Split by ':' first, then by ',' and convert to float
        parts = line.split(': ')[1].strip().split(',')
        # Correctly using x, y, z coordinates (indices 0, 1, 2)
        points.append([float(parts[0]), float(parts[1]), float(parts[2])])
    
    root = build_kdtree(points[:])
    
    # TODO: Implement closest pair finding logic
    return 0.0

if __name__ == '__main__':
    data = [
        "Proxima Centauri: 4.247, 2.945, -3.056, -0.143",
        "Barnard's star: 5.963, 4.958, 2.980, 1.449",
        "Luhman 16 A: 6.503, 1.697, -6.249, 0.600",
        "WISE J085510.83-071442.5: 7.532, -3.967, -5.664, 2.985",
        "Wolf 359: 7.856, -1.916, -3.938, 6.522"
    ]
    print(solution(data))