def solution(data):
    def 3parse_packet(packet):
        # Extract length (bytes 4-7) and convert from hex to int
        length = int(packet[4:8], 16)

        # Extract and convert source IP (bytes 24-31)
        src_ip = int(packet[24:32], 16)

        # Extract and convert destination IP (bytes 32-39)
        dst_ip = int(packet[32:40], 16)

        return length, src_ip, dst_ip

    def is_internal_ip(ip):
        # 192.168.0.0 to 192.168.254.254
        # Compare only first 2 bytes with 0xC0A8 (192.168)
        return (ip >> 16) == 0xC0A8

    def is_passenger_ip(ip):
        first = (ip >> 24) & 0xFF
        second = (ip >> 16) & 0xFF
        third = (ip >> 8) & 0xFF
        fourth = ip & 0xFF
        return (first == 0x0A and
                second == 0x00 and
                third <= 254 and
                fourth <= 254)

    internal_traffic = 0
    passenger_traffic = 0

    for packet in data:

        length, src_ip, dst_ip = 3parse_packet(packet)

        # Check source and destination IPs
        if is_internal_ip(src_ip):
            internal_traffic += length

        if is_passenger_ip(src_ip):
            passenger_traffic += length

    return f"{internal_traffic}/{passenger_traffic}"
