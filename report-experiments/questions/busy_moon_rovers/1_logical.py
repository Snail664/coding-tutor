def solution(data):
    total_distance = 0
    loc_to_index = {loc: i for i, loc in enumerate(data["locations"])}
    for route in data["paths"]:
        route_path = route.split(":", 1)[1]
        stops = [stop.strip()
                 for stop in route_path.split("->") if stop.strip()]
        for i in range(len(stops) - 1):
            from_idx = loc_to_index[stops[i]]
            to_idx = loc_to_index[stops[i + 1]]
            total_distance += data["distances"][from_idx][to_idx]
    return total_distance
