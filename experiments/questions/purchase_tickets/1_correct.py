def solution(data):
    # insert your code below
    total_costs = {}
    for line in data:
        company_and_rest = line.split(': ')
        if len(company_and_rest) != 2:
            continue
        company_code, rest = company_and_rest
        type_and_amount = rest.split(' ')
        if len(type_and_amount) != 2:
            continue
        charge_type, amount_str = type_and_amount
        try:
            amount = int(amount_str)
        except ValueError:
            continue
        if company_code not in total_costs:
            total_costs[company_code] = 0
        if charge_type in ['Seat', 'Meals', 'Luggage', 'Fee', 'Tax']:
            total_costs[company_code] += amount
        elif charge_type in ['Discount', 'Rebate']:
            total_costs[company_code] -= amount
        else:
            continue
    if not total_costs:
        return 0
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
