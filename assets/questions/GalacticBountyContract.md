# Galactic Bounty Contract

**Topics:** Hash Table, String Parsing

### Difficulty: Easy

The year is 2224. You are a renowned bounty hunter, traveling across the galaxy far far away in search of your next high-stakes mission. The Galactic Bounty Guild has tasked you with capturing an elusive space fugitive, but to begin your hunt, you must first hire a starship crew.

You have reached out to **20 different space crews**, each offering contracts with different **fees, taxes, and charges**, but also **discounts and rebates**. To make the most profit from your mission, you need to hire the **cheapest crew available**.

For each crew:
- Anything entry recorded as **Pilot, Fuel, Maintenance, Docking, or Tax** must be **added** to the total contract cost.
- Anything entry labeled as **Discount or Rebate** must be **subtracted** from the total contract cost.

After determining the final cost for each crew, what is the final cost of the cheapest option\?


## Input Format:

Each test case is represented as a list of strings where each string follows the format:
```
Crew: Cost_Type Cost_Value
```
where:

`Crew` is a string representing the name of the space crew.
`Cost_Type` is one of: `Pilot`, `Fuel`, `Maintenance`, `Docking`, `Tax`, `Discount`, or `Rebate`.
`Cost_Value` is a positive integer representing the corresponding charge or discount.

## Example

Input:

```
Orion: Pilot 9997,
Nebula: Discount 2886,
Titan: Maintenance 3500,
Orion: Tax 156,
Cosmo: Docking 9468,
Nebula: Docking 9378,
Orion: Discount 3103,
Titan: Rebate 967,
        
```

Output:

```
2533
```

Explanation:

Orion:
```
9997 + 156 - 3103 = 7050
```

Nebula:
```
9378 - 2886 = 6492
```

Cosmo 
```
9468
```

Titan: 
```
3500 - 967 = 2533
``` 

Based on the small example, spaceliner DDD would be the cheapest, so the answer would be **2533**.




## Constraints:
* 1 <= T <= 100 (Number of entries on each test case)
* Each `Cost_Value` is a positive integer in the range [1, 10<sup>6</sup>].
* There are at most 20 unique crews per test case.


## Your Task
Determine the final cost of the cheapest option. Your output is a single integer.