def solution(data):
    folders = {}
    current_folder = None
    folder_contents = {}
    
    # First pass: Parse input with logical errors
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
            # Logical error: overwriting existing folder contents
            folder_contents[current_folder] = []
        elif line.startswith('- '):
            if current_folder is not None:
                item = line[2:].strip()
                folder_contents[current_folder].append(item)
                if '[FOLDER' in item:
                    next_folder = item.split('[FOLDER')[1].strip(']')
                    # Logical error: incorrect folder relationship
                    folders[next_folder] = current_folder

    # Second pass: Calculate sizes with logical errors
    total_size = 0
    stack = [('0', False)]
    processed = set()

    while stack:
        folder_id, parent_deletable = stack.pop()
        
        # Logical error: not checking if folder was already processed
        
        for item in folder_contents.get(folder_id, []):
            if '[FOLDER' in item:
                folder_name = item.split(' [')[0]
                next_folder = item.split('[FOLDER')[1].strip(']')
                # Logical error: incorrect deletable condition
                is_deletable = 'delete' in folder_name or 'temporary' in folder_name
                stack.append((next_folder, is_deletable))
            else:
                name, size = item.rsplit(' ', 1)
                # Logical error: not considering parent_deletable
                if 'delete' in name or 'temporary' in name:
                    total_size += int(size)

    return total_size

if __name__ == '__main__':
    data = [
        "Folder: 0",
        "- taskmgr.exe 5065932",
        "- temporary_573 5048816",
        "- delete_708 2054307",
        "- temporary_023 [FOLDER 1]"
    ]
    print(solution(data))