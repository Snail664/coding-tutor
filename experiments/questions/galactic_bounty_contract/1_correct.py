def solution(data):
    total_costs = {}

    for line in data:
        parts = line.split(": ")
        if len(parts) != 2:
            continue
        
        crew, cost_details = parts
        cost_info = cost_details.split()
        if len(cost_info) != 2:
            continue
        
        cost_type, amount_str = cost_info
        try:
            amount = int(amount_str)
        except ValueError:
            continue

        # Initialize crew cost if not already present
        if crew not in total_costs:
            total_costs[crew] = 0

        # Apply charges and discounts
        if cost_type in {"Pilot", "Fuel", "Maintenance", "Docking", "Tax"}:
            total_costs[crew] += amount
        elif cost_type in {"Discount", "Rebate"}:
            total_costs[crew] -= amount

    # Return the minimum cost among all crews
    return min(total_costs.values(), default=0)
