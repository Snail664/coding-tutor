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
        # 192.168.0.0 to 192.168.254.254
        # Compare only first 2 bytes with 0xC0A8 (192.168)
        return (ip >> 16) == 0xC0A8

    def is_passenger_ip(ip):
        # 10.0.0.0 to 10.0.254.254
        # Compare first byte with 0x0A (10) and second byte with 0x00
        return (ip >> 24) == 0x0A and ((ip >> 16) & 0xFF) == 0x00

    internal_traffic = 0
    passenger_traffic = 0

    for packet in data:
        # Skip invalid packets
        if len(packet) < 40:
            continue

        length, src_ip, dst_ip = parse_packet(packet)

        # Check source and destination IPs
        if is_internal_ip(src_ip) or is_internal_ip(dst_ip):
            internal_traffic += length

        if is_passenger_ip(src_ip) or is_passenger_ip(dst_ip):
            passenger_traffic += length

    return f"{internal_traffic}/{passenger_traffic}"

if __name__ == '__main__':
    # Test with example data
    test_data = [
        '45000377000000008306f39f0A000bc1d7253441',
        '4500007f0000000005065de1c0a800b833c555ee',
        '450002e50000000008061ef5c0a8796698721661',
        '4500017e00000000b206e54e88c7fd4f0A00244c',
        '45000164000000009d06d73c0A0000b7e0b143b8'
    ]
    print(solution(test_data))


