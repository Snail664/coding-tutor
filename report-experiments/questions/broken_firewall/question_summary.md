You are given 1000 IPv4 packet headers as hexadecimal strings. Each header encodes:
- A 16-bit packet length (located at bytes 3–4).
- A source IP (bytes 13–16).
- A destination IP (bytes 17–20).

The task is to compute:
- The total number of bytes for packets where either the source or destination IP falls within the ship’s internal systems range (`192.168.0.0` to `192.168.254.254`).
- The total number of bytes for packets where either the source or destination IP falls within the passenger wifi range (`10.0.0.0` to `10.0.254.254`).

Finally, output the ratio of the ship's internal bytes to the passenger wifi bytes in the format `internal_total/passenger_total`.

**Example:**

For a small set of packet headers, if the computed totals are 868 bytes (internal) and 1625 bytes (wifi), the expected output is:
```
868/1625
```