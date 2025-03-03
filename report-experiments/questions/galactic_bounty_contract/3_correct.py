def solution(data):
    total_costs = {}

    for line in data:
        company_code, rest = line.split(': ', 1)
        parts = rest.strip().split(' ')
        charge_type, amount_str = parts
        amount = int(amount_str)
        if company_code not in total_costs:
            total_costs[company_code] = 0
        if charge_type in ['Seat', 'Meals', 'Luggage', 'Fee', 'Tax']:
            total_costs[company_code] += amount
        elif charge_type in ['Discount', 'Rebate']:
            total_costs[company_code] -= amount
    min_cost = min(total_costs.values())
    return min_cost
