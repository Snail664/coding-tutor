def solution(data):
    folders = {}
    current_folder = None
    total_size = 0
    
    # Parse the folder structure first
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
            folders[current_folder] = []
        elif line.startswith('- '):
            if current_folder is not None:
                entry = line[2:].strip()
                folders[current_folder].append(entry)
    
    # Try to calculate sizes for files that should be deleted
    for folder_id, items in folders.items():
        for item in items:
            # Handle regular files first
            if '[FOLDER' not in item:
                name, size = item.rsplit(' ', 1)
                # Check if file should be deleted
                if 'delete' in name.lower() or 'temporary' in name.lower():
                    total_size += int(size)
            else:
                # Not sure how to handle nested folders yet
                # Need to figure out how to track which folders contain 'delete' or 'temporary'
                folder_name = item.split(' [')[0]
                next_folder = item.split('[FOLDER')[1].strip(']')
                # Maybe need to recursively check subfolders?
                pass
    
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