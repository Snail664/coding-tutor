def solution(data):
    total_costs = {}

    for line in data:
        company_code, rest = line.split(': ', 1)
        parts = rest.strip().split(' ')
        charge_type, amount_str = parts
        amount = int(amount_str)
        if company_code not in total_costs:
            total_costs[company_code] = 0
        if charge_type in ['Seat', 'Meals', 'Luggage', 'fee', 'Tax']:
            total_costs[company_code] += amount
        elif charge_type in ['Discount', 'Rebate']:
            total_costs[company_code] -= amount
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
