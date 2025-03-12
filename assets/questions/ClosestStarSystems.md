# Closest Star Systems

## Topics:

`Divide and Conquer` `Math` `Sorting` 

## Problem Statement: 

You are a stellar cartographer working for the Galactic Survey Corps. Your mission is to analyze the positions of star systems across the Milky Way and determine which two star systems are closest to each other.

The Observatory AI has just finished scanning a sector of space, providing a list of star systems with their galactic coordinates. 

Each star system is represented by four values: **distance from Earth**, **X**, **Y** and **Z**. 

X, Y and Z are axis positions of the star from the galactic center in light years. 

* Your task is to find the **closest two star systems**, using the 3D Euclidean distance formula.

## Distance Calculation
The distance between two stars A and B with coordinates (𝑋1,𝑌1,𝑍1) and(X2,Y2,Z2) is given by the Pythagoras Theorem formula: 
```
distance = sqrt((X1 - X2)^2 + (Y1 - Y2)^2 + (Z1 - Z2)^2)
```
## Input
The input consists of a list of strings where each string follows the format:

```
System_Name: Distance_from_Earth, X, Y, Z
```
`System_Name`: A unique name for the star system.\
`Distance_from_Earth`: A floating-point number (not relevant for calculations).\
`X, Y, Z`: Floating-point numbers representing the star's galactic coordinates.

## Constraints
* 2≤𝑁≤10<sup>4</sup> (Number of star systems)
* Coordinates X,Y,Z are floating-point numbers in the range [−10<sup>5</sup> ,10<sup>5</sup>].
* The distance between two distinct star systems is always non-zero.

## Your Task

Perform Pythagoras theorem in 3 dimensions on every pair of star coordinates in the input data.
Find the **pair** that are the **closest** distance from each other. 

Give your answer to **three decimal places**.