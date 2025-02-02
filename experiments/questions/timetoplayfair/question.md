# Time to Play Fair

You receive a message from your sister back on Earth. Just as a couple of years ago, you still communicate with each other using a private cipher - for a little bit of nerdy fun between siblings. Recently, you both agreed to switch to using a **Playfair cipher**, so that's what you are going to have to figure out in order to read the message.

Since there are a few ways of implementing Playfair, you remember the two of you agreed to the following stipulations:

- Replace any and all occurrences of `j` with the letter `i`.
- For words of odd length, append an `x` (unless the last letter is already `x`, in which case use a `q`).

### Example

Consider this example Playfair grid, created using the encryption key `helloworld` and the phrase to decode of `wp nehslv ewgw`.

```
h e l o w
r d a b c
f g i k m
n p q s t
u v x y z
```

Notice that repeat occurrences of letters have been ignored when creating the grid (only the first `l` and `o` appear).  
The rest of the alphabet has been added, ignoring letters used by the cipher key and the letter `j`.

Break each word of the phrase into letter pairs: `wp`, `ne`, `hs`, `lv`, and `ew`, `gw`.

- `wp` appears on different rows and columns in the grid. That means `w` is replaced by the letter at the same row as `w` but the column of `p`, which is the letter `e`. Likewise, `p` is replaced by the letter at the same row as `p` but the column of `w`, which is the letter `t`.
- The pairs `ne`, `hs`, `lv`, and `gw` all appear in different rows and columns to their paired letters, so the same method applies.
- The pair `ew` appears in the same row, so in that case, the `e` is replaced by the letter immediately to the left, which is `h`, and the `w` is also replaced with the letter immediately to the left, which is `o` (wrap around if required; for instance, `h` would be decoded with `w` in the above example).

A similar process applies if a pair of letters appear in the same column: you decode with the letter immediately above each letter.

The above phrase decodes to `et phonex home`. The `x` in `phonex` appears because the `x` was added to ensure all words have an even number of letters. It is one of the quirks of the Playfair algorithm.

### Your Task

Obtain your decryption key and message to decode from your input data. The decoded message is your answer.