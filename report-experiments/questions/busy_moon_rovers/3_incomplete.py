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
