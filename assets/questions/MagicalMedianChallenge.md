# Magical Median Challenge

In this enchanted coding challenge, you'll be presented with two magical scrolls, each containing a list of numbers in perfect order. Your mission, should you choose to accept it, is to find the elusive median that lies hidden within these scrolls! 

Scroll One (**nums1**): A sorted array of 'm' mysterious numbers
Scroll Two (**nums2**): Another sorted array of 'n' enigmatic numbers

Combine the wisdom of both scrolls and reveal the median - the number that stands at the very heart of this numerical realm! But beware, young wizards! If the median turns out to be a tricky decimal, you must return an integer (rounded down to the nearest whole number).

## Example

- **Input:** [[1,3], [2]], where nums1 = [1,3] and nums2 = [2]

   **Output:** 2 

   **Explanation:** merged scroll = [1,2,3] and the median is 2

- **Input:** [[1,2], [3,4]], where nums1 = [1,2] and nums2 = [3,4]

   **Output:** 2 

   **Explanation:** merged scroll = [1,2,3,4] and the median is (2 + 3) / 2 = 2.5. But remember with decimals, the mystical median materializes as 2 (the integer value of 2.5)

## Constraints:
The length of Scroll One (m) and Scroll Two (n) must be between 0 and 1000.
The total length of both scrolls combined (m + n) must be at least 1 and at most 2000.
The numbers in each scroll must be between -106 and 106.

## Your Task

Your spell (function) should take a single parameter - a nested array containing the two magical scrolls. Can you craft a solution worthy of the greatest wizards, with a runtime complexity of O(log (m+n))? The fate of the numerical realm rests in your hands as you attempt to find the median of the two sorted arrays. Remember to always use the integer spell!