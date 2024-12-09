# Hotel Door Code

You have arrived at the Space Station and make your way to the onboard hotel. After completing the check-in procedure, the hotel receptionist sends your room keycode to your phone. Unfortunately, it seems the file is in a format that is not compatible with your phone, so you are going to have to decode it manually.

You ascertain that the file is supposed to be an image file but it seems to be compressed using a form of Run-Length Encoding (RLE). Performing a summation of all the values in the data, you realize there are 8000 pixels worth of data, and that the data appears to just be black and white values. You hypothesize that the image would be close to a square, so with 8000 pixels you decide to try **80 rows x 100 columns** first.

### Example

Consider the small example of run-length encoded data below that renders into a 10 wide by 6 high image:

```
12 6 4 1 9 5 5 1 9 1 7
```

By rendering the first number as `.` (white) pixels, and the second number as `#` (black) pixels, and then alternating between the two until completion, the image would look like this:

```
..........
..######..
..#.......
..#####...
..#.......
..#.......
```

Which can be read as the letter **F**.

### Your Task

Find your room code by decoding the run-length encoded input data into an **80 rows x 100 columns** pixel image. The answer is the number you can read in the resulting image.