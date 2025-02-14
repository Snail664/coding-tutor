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
