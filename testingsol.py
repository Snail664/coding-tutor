def solution(data):
    costs = {}
    for item in data:
        words = item.split(" ")
        crew = words[0][:-1]
        cost_type = words[1]
        cost = int(words[2])
        if crew not in costs:
            costs[crew] = 0
        if cost_type in ["Pilot", "Fuel", "Maintenance", "Docking", "Tax"]:
            costs[crew] += cost
        elif cost_type in ["Discount", "Rebate"]:
            costs[crew] -= cost
    return min(costs.values())
