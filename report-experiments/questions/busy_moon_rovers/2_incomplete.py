def solution(data):
    loc_to_index = {loc: i for i, loc in enumerate(data["locations"])}
    total_distance = 0
    for route in data["routes"]:
        # Use map to strip whitespace and split the route string once
        stops = list(map(str.strip, route.split(":", 1)[1].split("->")))
        # Use zip to iterate through consecutive stops and sum their distances
        total_distance += sum(
            data["distances"][loc_to_index[a]][loc_to_index[b]]
            for a, b in zip(stops, stops[1:])
        )
