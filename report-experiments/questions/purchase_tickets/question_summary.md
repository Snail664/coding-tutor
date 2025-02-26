Given a list of records for various companies, each record specifies a company name, a cost category, and an amount. Categories like "Seat", "Meals", "Luggage", "Fee", and "Tax" add to the company's total cost, while categories such as "Discount" and "Rebate" subtract from it. Your task is to compute the final cost for each company and return the minimum final cost among all companies.

Simplified Example

Input:
AAA: Seat 9997  
BBB: Discount 2886  
DDD: Luggage 3500  
AAA: Tax 156  
CCC: Fee 9468  
BBB: Fee 9378  
AAA: Discount 3103  
DDD: Rebate 967  
  
Expected Output:  
2533  