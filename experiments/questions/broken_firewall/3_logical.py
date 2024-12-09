def solution(data):
    import ipaddress

    ship_internal_bytes = 0
    passenger_wifi_bytes = 0
    ship_internal_network = ipaddress.IPv4Network('192.168.0.0/8')
    passenger_wifi_network = ipaddress.IPv4Network('10.0.0.0/8')

    for packet in data:
        packet = packet.strip()
        if len(packet) < 40:
            continue

        length_hex = packet[4:8]  # Positions 4 to 7
        packet_length = int(length_hex, 16)

        source_ip_hex = packet[24:32]
        source_ip_parts = [str(int(source_ip_hex[i:i+2], 16))
                           for i in range(0, 8, 2)]
        source_ip = '.'.join(source_ip_parts)

        dest_ip_hex = packet[32:40]
        dest_ip_parts = [str(int(dest_ip_hex[i:i+2], 16))
                         for i in range(0, 8, 2)]
        dest_ip = '.'.join(dest_ip_parts)

        source_ip_addr = ipaddress.IPv4Address(source_ip)
        dest_ip_addr = ipaddress.IPv4Address(dest_ip)

        if source_ip_addr in ship_internal_network or dest_ip_addr in ship_internal_network:
            ship_internal_bytes += packet_length

        if source_ip_addr in passenger_wifi_network or dest_ip_addr in passenger_wifi_network:
            passenger_wifi_bytes += packet_length

    return f"{ship_internal_bytes}/{passenger_wifi_bytes}"


if __name__ == '__main__':
    data = [
        '45000377000000008306f39f0A000bc1d7253441',
        '4500007f0000000005065de1c0a800b833c555ee',
        '450002e50000000008061ef5c0a8796698721661',
        '4500017e00000000b206e54e88c7fd4f0A00244c',
        '45000164000000009d06d73c0A0000b7e0b143b8'
    ]
    print(solution(data))
