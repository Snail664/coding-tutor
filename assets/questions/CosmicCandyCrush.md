# Cosmic Candy Crush

## Topics 

`Divide and Conquer` `Dynamic Programming` `Memoization` 

## Problem Statement
In the Cosmic Candy Crush game, you're given a row of space candies `nums`, **each** with a **cosmic number**. 

## Game Rules
1. When you crush a candy at index `i`, the stardust earned is:
   * `nums[i] * left * right`
   * `left` is the number to the left of `nums[i]` (or `1` if no candy exists).
   * `right` is the number to the right of `nums[i]` (or `1` if no candy exists).
2. After crushing a candy, the row shrinks, and remaining candies shift left.
3. The process repeats **until all** candies are crushed.


## Example
   **Sample Input** 
   ```
   [3,1,5,8]
   ```

   **Sample Output** 
   ```
   167
   ```

   **Explanation**
   Optimal Crushing Sequence:
   1. Crush the `1` candy: `3 * 1 * 5 = 15` stardust coins
   2. Crush the `5` candy: `3 * 5 * 8 = 120` stardust coins
   3. Crush the `3` candy: `1 * 3 * 8 = 24` stardust coins
   4. Crush the `8` candy: `1 * 8 * 1 = 8` stardust coins
   5. Total Stardust Coins: `167`


## Constraints:
* `n == nums.length` (`n` is the number of space candies)
* `1 <= n <= 300` 
* `0 <= nums[i] <= 100` 

## Your Task
The function should take an **array of numbers** (representing the space candies).
Return the **maximum** stardust possible by choosing the **optimal** crushing order.

