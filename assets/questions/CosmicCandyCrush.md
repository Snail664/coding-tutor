# Cosmic Candy Crush

## Topics: 

`Divide and Conquer` `Dynamic Programming` `Memoization` 

Step into "Cosmic Candy Crush," where your strategic sweet-smashing skills can earn you a fortune in stardust coins!
You're facing a row of colorful space candies, each with a mysterious cosmic number etched on it. Your mission? Crush every single candy and collect as much stardust as possible. But here's the twist: the order in which you crush them matters!

## Rules of the Game
When you crush a space candy, you'll earn stardust coins based on a special formula:
* You get the cosmic number on the candy you crushed...
* ...multiplied by the numbers on the candies to its left and right!
* If there's no candy on either side, imagine there's an invisible candy with a "1" on it.

Your goal is to find the perfect crushing order to maximize your stardust collection!

## Example
- You are faced with space candies numbered 3,1,5 and 8.

   **Input:** [3,1,5,8]

   **Output:** 167

   **Optimal Strategy:**
   * Crush the "1" candy first: 3 * 1 * 5 = 15 stardust coins
   * Then crush the "5": 3 * 5 * 8 = 120 stardust coins
   * Next, crush the "3": 1 * 3 * 8 = 24 stardust coins
   * Finally, crush the "8": 1 * 8 * 1 = 8 stardust coins
   * Total Stardust Coins: 167

- **Input:** [1,5]

   **Output:** 10

## Constraints:
To ensure fair play across the galaxy, the Intergalactic Gaming Commission has set the following constraints:
* n == nums.length (where n is the number of space candies)
* 1 <= n <= 300 (there can be between 1 and 300 space candies)
* 0 <= nums[i] <= 100 (each candy's cosmic number is between 0 and 100)

## Your Task

As a master game designer of the cosmos, your task is to create a function that determines the maximum number of stardust coins a player can earn in any given candy arrangement. The function should take an array of numbers (representing the space candies) and return the highest possible stardust total.