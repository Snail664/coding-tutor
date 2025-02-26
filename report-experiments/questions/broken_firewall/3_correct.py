def solution(data):
    def parse_packet(packet):
        # Extract length (bytes 4-7) and convert from hex to int
        length = int(packet[4:8], 16)

        # Extract and convert source IP (bytes 24-31)
        src_ip = int(packet[24:32], 16)

        # Extract and convert destination IP (bytes 32-39)
        dst_ip = int(packet[32:40], 16)

        return length, src_ip, dst_ip

    def is_internal_ip(ip):
        first = (ip >> 24) & 0xFF
        second = (ip >> 16) & 0xFF
        third = (ip >> 8) & 0xFF
        fourth = ip & 0xFF
        return (first == 0xC0 and
                second == 0xA8 and
                third <= 254 and
                fourth <= 254)

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

        length, src_ip, dst_ip = parse_packet(packet)
        print(length, src_ip, dst_ip)

        # Check source and destination IPs
        if is_internal_ip(src_ip) or is_internal_ip(dst_ip):
            internal_traffic += length

        if is_passenger_ip(src_ip) or is_passenger_ip(dst_ip):
            passenger_traffic += length

    return f"{internal_traffic}/{passenger_traffic}"
