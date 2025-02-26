def solution(data):
    ship_internal_bytes = 0
    passenger_wifi_bytes = 0

    # Function to convert IP address string to integer
    def ip_str_to_int(ip_str):
        parts = list(map(int, ip_str.split('.')))
        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]

    # Ship internal systems IP range (192.168.0.0 - 192.168.254.254)
    ship_internal_start = ip_str_to_int('192.168.0.0')
    ship_internal_end = ip_str_to_int('192.168.254.254')

    # Passenger wifi IP range (10.0.0.0 - 10.0.254.254)
    passenger_wifi_start = ip_str_to_int('10.0.0.0')
    passenger_wifi_end = ip_str_to_int('10.0.254.254')

    for packet in data:
        packet = packet.strip()
        if len(packet) < 40:
            continue  # Skip invalid packets
