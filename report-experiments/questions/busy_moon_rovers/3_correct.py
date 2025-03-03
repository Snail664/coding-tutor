def solution(data):
    total_distance = 0
    location_indices = {}
    for i in range(len(data["locations"])):
        location_indices[data["locations"][i]] = i

    for route in data["routes"]:
        parts = route.split(":")
        journey = parts[1]
        stops_raw = journey.split("->")
        stops = []
        for stop in stops_raw:
            stops.append(stop.strip())
        i = 0
        while i < len(stops) - 1:
            from_stop = stops[i]
            to_stop = stops[i + 1]
            from_index = location_indices[from_stop]
            to_index = location_indices[to_stop]
            total_distance = total_distance + \
                data["distances"][from_index][to_index]
            i = i + 1

    return total_distance
