# Broken Firewall

Tickets in hand, you board your rocket flight ready for your vacation. Just as you are settling into your seat, the pilot can be heard on the speaker system.
It seems the network router has been accidentally reset and is blocking legitimate traffic between the rocket systems and mission control, while simultaneously also allowing the onboard passengers to overwhelm the wifi.

On inspection, you determine the router is using **Internet Protocol version 4 (IPv4)** and recorded the IP headers of **1000 packets** for analysis, your input data.

Speaking to the captain, you are advised that internal ship systems are in the `192.168.0.0` through to `192.168.254.254` IP address range, while passenger wifi is on the `10.0.0.0` to `10.0.254.254` IP address range. Any other addresses are external to the ship (for instance the ship control center, space traffic control, or just other internet locations for passenger web browsing).

## Example

Consider the first 5 packets you recorded the headers for:

```
45000377000000008306f39f0A000bc1d7253441
4500007f0000000005065de1c0a800b833c555ee
450002e50000000008061ef5c0a8796698721661
4500017e00000000b206e54e88c7fd4f0A00244c
45000164000000009d06d73c0A0000b7e0b143b8
```

Knowing Internet Protocol version 4, you know that bytes 3 and 4 are a 16-bit integer for the length of the packet, bytes 13 to 16 represent the source IP address, and bytes 17 to 20 represent the destination IP address.

Looking at the first packet, you identify the length as being the hexadecimal `03 77`, which is the decimal number 887. Additionally, you identify the source IP address as being the bytes `0A 00 0B C1`, which converts to an address of `10.0.11.193`. The destination IP address has the bytes `D7 25 34 41`, which converts to `215.37.52.65`.

For the first 5 packets, the length, source IP address, and destination IP address convert into the following:

1. `45000377000000008306f39f0A000bc1d7253441`  
   **Length:** 887 bytes  
   **Source IP address:** `10.0.11.193`  
   **Destination IP address:** `215.37.52.65`

2. `4500007f0000000005065de1c0a800b833c555ee`  
   **Length:** 127 bytes  
   **Source IP address:** `192.168.0.184`  
   **Destination IP address:** `51.197.85.238`

3. `450002e50000000008061ef5c0a8796698721661`  
   **Length:** 741 bytes  
   **Source IP address:** `192.168.121.102`  
   **Destination IP address:** `152.114.22.97`

4. `4500017e00000000b206e54e88c7fd4f0A00244c`  
   **Length:** 382 bytes  
   **Source IP address:** `136.199.253.79`  
   **Destination IP address:** `10.0.36.76`

5. `45000164000000009d06d73c0A0000b7e0b143b8`  
   **Length:** 356 bytes  
   **Source IP address:** `10.0.0.183`  
   **Destination IP address:** `224.177.67.184`

With that information, you determine the total bytes of network traffic for the ship's internal systems as being 868 bytes, and the passenger wifi as being 1625 bytes. Therefore, the ratio would be `868/1625`, which would be your answer (submit in that style, don't perform the division).


## Constraints
- 1 ≤ len(packet_headers) ≤ 1000
- Each packet_headers[i] is a valid 40-character hexadecimal string.
- All IP addresses are well-formed.


## Your Task
Determine the total bytes of network traffic that either originates from or is destined for the ship’s internal systems, as well as the total bytes of network traffic for the passenger wifi. You must return the result as a **ratio of the two traffic amounts**.