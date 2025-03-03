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
