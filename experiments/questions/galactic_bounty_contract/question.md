# Purchase Tickets

The year is 2224. You have spent most of the past year on Earth, catching up with friends and family after your travels of recent years. It didn't take too long, however, for you to long for spending some more time in space. You have decided that what you need is to spend the next two weeks on holiday to an Earth-orbiting Space Station and the Moon base, Luna City. Let’s go on an adventure!

The first thing you need to do is purchase your rocket flight tickets.

Rocket flight companies are worse than the airlines of the 21st century when it comes to extra fees and charges. If you know the deals, you can also find numerous discounts and deductions for various loyalty programmes and so forth. Always in the hunt for a good deal, you scrape the internet searching for every possible option available so you can get the best possible price on your tickets.

You recorded all the details of different options in a file as you found them (your input data). There are 20 different space travel companies you have researched the deals of. Determine the total cost for each company.

- Anything recorded as a seat, meals, luggage, fee or tax must be **added** to the cost for that company.
- Anything that is recorded as a discount or rebate can be **subtracted** from the cost for that company.

After determining the final cost each, what is the final cost of the cheapest option?

## Example

Consider the following example:

```
AAA: Seat 9997
BBB: Discount 2886
DDD: Luggage 3500
AAA: Tax 156
CCC: Fee 9468
BBB: Fee 9378
AAA: Discount 3103
DDD: Rebate 967
```

Spaceliner AAA has a seat cost of 9997, tax of 156, and a discount of 3103. That brings AAA to a total of:

```
9997 + 156 - 3103 = 7050
```

Spaceliner BBB has a fee of 9378 and a discount of 2886. That brings BBB to a total cost of:

```
9378 - 2886 = 6492
```

Spaceliner CCC has a fee of 9468 and that's all, so its final cost is **9468**.

Spaceliner DDD has a luggage cost of 3500 and a rebate of 967, so the final cost is:

```
3500 - 967 = 2533
```

Based on the small example, spaceliner DDD would be the cheapest, so the answer would be **2533**.

## Your Task

Of the options presented, what is the final cost of the cheapest option?