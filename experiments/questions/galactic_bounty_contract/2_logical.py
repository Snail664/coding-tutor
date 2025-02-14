def solution(data):
    # Initialize a dictionary to hold the total costs per company
    total_costs = {}
    add_types = {'Seat', 'Meals', 'Luggage', 'Fee', 'Tax'}
    subtract_types = {'Discount', 'Rebate'}

    # Process each line in the data
    for line in data:
        if ': ' not in line:
            continue
        company_code, rest = line.split(': ', 1)
        parts = rest.strip().split(' ')
        if len(parts) != 3:
            continue
        charge_type, amount_str = parts
        amount = int(amount_str)
        if company_code not in total_costs:
            total_costs[company_code] = 0
        if charge_type in add_types:
            total_costs[company_code] += amount
        elif charge_type in subtract_types:
            total_costs[company_code] -= amount
        else:
            continue  # Skip unknown charge types
    # Now, find the minimal total cost
    if not total_costs:
        return 0  # If no companies, return 0
    else:
        min_cost = min(total_costs.values())
        return min_cost


if __name__ == '__main__':
    data = [
        "AAA: Seat 9997",
        "BBB: Discount 2886",
        "DDD: Luggage 3500",
        "AAA: Tax 156",
        "CCC: Fee 9468",
        "BBB: Fee 9378",
        "AAA: Discount 3103",
        "DDD: Rebate 967"
    ]
    print(solution(data))
