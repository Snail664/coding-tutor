# Busy Moon Rovers

You make the short trip from the Space Station over to the Moon base, Luna city, for a few days. You bump into an old friend of yours who runs a logistics and delivery business there, running automated rovers to deliver supplies to the various outposts around the moon.

Your friend expresses to you that they are curious how far their rovers travel per day, and you offer to help out.

Your friend supplies you a spreadsheet detailing the distances between the respective outposts, and a record of the stops made by the automated rovers throughout the day (your input data). Each rover starts and ends the day at the main base so they can recharge overnight.

### Example

Consider the following simplified example with the distances between base camp and 3 outposts:

|        | base  | ta00  | cx22  | xj84  |
|--------|-------|-------|-------|-------|
| base   | 0     | 55457 | 63529 | 61302 |
| ta00   | 55457 | 0     | 111890| 35768 |
| cx22   | 63529 | 111890| 0     | 98977 |
| xj84   | 61302 | 35768 | 98977 | 0     |

And the following example rover journey log:

```
Rover 1 route: base -> cx22 -> ta00 -> base -> xj84 -> base
```

This particular rover traveled as follows:
- From base to cx22 - a distance of 63529.
- From cx22 to ta00 - a distance of 111890.
- From ta00 to base - a distance of 55457.
- From base to xj84 - a distance of 61302.
- From xj84 to base - a distance of 61302.

Sum these distances to calculate the total distance traveled by this rover as **353480**.

### Your Task

Process the journey distances of all 10 rovers to calculate the total distance traveled. That is your answer value.