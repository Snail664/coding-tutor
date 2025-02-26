def solution(data):
    ship_internal_bytes = 0
    passenger_wifi_bytes = 0

    def ip_str_to_int(ip_str):
        parts = list(map(int, ip_str.split('.')))
        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]

    ship_internal_start = ip_str_to_int('192.168.0.0')
    ship_internal_end = ip_str_to_int('192.168.254.254')

    passenger_wifi_start = ip_str_to_int('10.0.0.0')
    passenger_wifi_end = ip_str_to_int('10.0.254.254')

    for packet in data:
        packet = packet.strip()

        length_hex = packet[4:8]
        packet_length = int(length_hex, 16)

        source_ip_hex = packet[24:32]
        source_ip_bytes = [int(source_ip_hex[i:i+2], 16)
                           for i in range(0, 8, 2)]
        source_ip_int = (source_ip_bytes[0] << 24) + (source_ip_bytes[1] << 16) + \
                        (source_ip_bytes[2] << 8) + source_ip_bytes[3]

        dest_ip_hex = packet[32:40]
        dest_ip_bytes = [int(dest_ip_hex[i:i+2], 16) for i in range(0, 8, 2)]
        dest_ip_int = (dest_ip_bytes[0] << 24) + (dest_ip_bytes[1] << 16) + \
                      (dest_ip_bytes[2] << 8) + dest_ip_bytes[3]

        if ship_internal_start <= source_ip_int <= ship_internal_end or \
           ship_internal_start <= dest_ip_int <= ship_internal_end:
            ship_internal_bytes += packet_length

        if passenger_wifi_start <= source_ip_int <= passenger_wifi_end or \
           passenger_wifi_start <= dest_ip_int <= passenger_wifi_end:
            passenger_wifi_bytes += packet_length

    # Return the ratio in the specified format
    return f"{ship_internal_bytes}/{passenger_wifi_bytes}"
