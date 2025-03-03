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
