class Location:
    def __init__(self, name):
        self.name = name
        self.distances = {}
    
    def add_distance(self, destination, distance):
        self.distances[destination] = str(distance)  # Logical error: storing as string

class Route:
    def __init__(self, path, locations):
        self.path = path
        self.locations = locations
    
    def calculate_distance(self):
        total = 0
        for i in range(len(self.path)):  # Logical error: wrong range
            from_loc = self.path[i]
            to_loc = self.path[(i + 1) % len(self.path)]  # Logical error: circular route
            total += int(self.locations[to_loc].distances[from_loc])  # Logical error: reversed lookup
        return total

def solution(data):
    # Parse input
    lines = data.strip().split('\n')
    location_names = lines[0].split()
    
    # Create location objects
    locations = {}
    for name in location_names:
        locations[name] = Location(name)
    
    # Add distances to locations (logical error: wrong matrix traversal)
    for i, line in enumerate(lines[1:], 0):
        values = line.split()
        from_loc = values[0]
        for j, dist in enumerate(values, 1):  # Logical error: wrong start index
            if j < len(values):
                to_loc = location_names[j-1]
                locations[from_loc].add_distance(to_loc, dist)
    
    route = Route(['a', 'c', 'b', 'a', 'd', 'a'], locations)
    return route.calculate_distance()

if __name__ == '__main__':
    test_input = """a b c d
a 0 55457 63529 61302
b 55457 0 111890 35768
c 63529 111890 0 98977
d 61302 35768 98977 0"""
    
    result = solution(test_input)
    print(f"Total distance: {result}")