def solution(data):
    # insert your solution below
    def ip_str_to_int(ip_str):
        parts = list(map(int, ip_str.split('.')))
        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]

    def hex_to_int(hex_str):
        res = 0
        hex_str = hex_str(: : -1)
        for place in range(len(hex_str)):
            val = 0
            if hex_str[place] == 'a':
                val = 10
            elif hex_str[place] == 'b':
                val = 11
            elif hex_str[place] == 'c':
                val = 12
            elif hex_str[place] == 'd':
                val = 13
            elif hex_str[place] == 'e':
                val = 14
            elif hex_str[place] == 'f':
                val = 15
            else:
                val = int(hex_str[place])
            res = res + val*pow(16, place)
        return res

    passenger = 0
    system = 0
    for packet in data:
        # convert hexadecimal string to integer number
        src_adr = hex_to_int(packet[24:32].lower())
        dst_adr = hex_to_int(packet[32:40].lower())
        pkt_len = hex_to_int(packet[4:8].lower())
        min_passenger_address = ip_str_to_int('10.0.0.0')
        max_passenger_address = ip_str_to_int('10.0.254.254')
        min_system_address = ip_str_to_int('192.168.0.0')
        max_system_address = ip_str_to_int('192.168.254.254')

        if src_adr <= min_passenger_address and src_adr >= max_passenger_address:
            passenger += pkt_len
        elif dst_adr <= min_passenger_address and dst_adr >= max_passenger_address:
            passenger += pkt_len

        if src_adr >= min_system_address and src_adr <= max_system_address:
            system += pkt_len
        elif dst_adr >= min_system_address and dst_adr <= max_system_address:
            system += pkt_len

    return f"{system}/{passenger}"
