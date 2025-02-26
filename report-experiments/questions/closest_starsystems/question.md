# Closest Star Systems

You are relaxing at a bar and strike up a conversation with a couple of other space travelers. You start talking about the vastness of space and how close (or far) different star systems are from each other. You actually get into a little bit of a disagreement because they are saying our Solar system and the Proxima Centauri system are the closest to travel between in the Milky Way at 4.247 light years. You aren't so sure and imagine that amongst all the star systems out there, there must be some that are closer to each other than that.

Determined to get to the truth of the matter, you download data for a **List of Nearby Stars** to extract the coordinates for stars within about 26 light years of Earth. When a system has multiple stars, you just take the coordinates of the first star in that system - your input data.

Looking at the first 5 systems in the data:

| System                            | Dist  | X      | Y      | Z      |
|------------------------------------|-------|--------|--------|--------|
| Proxima Centauri                   | 4.247 | 2.945  | -3.056 | -0.143 |
| Barnard's star                     | 5.963 | 4.958  | 2.980  | 1.449  |
| Luhman 16 A                        | 6.503 | 1.697  | -6.249 | 0.600  |
| WISE J085510.83-071442.5           | 7.532 | -3.967 | -5.664 | 2.985  |
| Wolf 359                           | 7.856 | -1.916 | -3.938 | 6.522  |

- The **Dist** column indicates the system distance from our solar system.
- The **X, Y, Z** columns indicate each star system's distance from the Sun (Sol) in the x, y, and z planes.

To calculate the distance between any two star systems, we need to find the difference in their x/y/z distances and use those differences with the Pythagorean theorem to calculate the distance between the pair of star systems.

For example, to find the distance between **Proxima Centauri** and **Barnard's star**:

\[
\text{distance} = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2 + (z_1 - z_2)^2}
\]
\[
= \sqrt{(2.945 - 4.958)^2 + (-3.056 - 2.980)^2 + (-0.143 - 1.449)^2}
\]
\[
= 6.559 \text{ light years}
\]

### Example Calculations

For the first five systems, the calculated distances between pairs would be:

| FROM                             | TO                                | CALCULATED DISTANCE |
|-----------------------------------|-----------------------------------|---------------------|
| Proxima Centauri                  | Barnard's star                    | 6.559               |
| Proxima Centauri                  | Luhman 16 A                       | 3.508               |
| Proxima Centauri                  | WISE J085510.83-071442.5          | 8.023               |
| Proxima Centauri                  | Wolf 359                          | 8.296               |
| Barnard's star                    | Luhman 16 A                       | 9.825               |
| Barnard's star                    | WISE J085510.83-071442.5          | 12.519              |
| Barnard's star                    | Wolf 359                          | 10.993              |
| Luhman 16 A                       | WISE J085510.83-071442.5          | 6.173               |
| Luhman 16 A                       | Wolf 359                          | 7.312               |
| WISE J085510.83-071442.5          | Wolf 359                          | 4.438               |

Of the above limited data, the closest pair of systems is **Proxima Centauri** and **Luhman 16 A** at a distance of **3.508 light years**. In this instance, **3.508** would be your answer.

### Your Task

Perform Pythagoras theorem in 3 dimensions on every pair of star coordinates in the input data and find the pair that are the closest distance from each other. 

Give your answer to **three decimal places**.