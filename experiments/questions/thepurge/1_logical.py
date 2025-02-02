def should_delete(name):
    # Logical error: case sensitive check and incomplete keywords
    return 'DELETE' in name or 'TEMPORARY' in name

def solution(data):
    folders = {}
    current_folder = None
    
    # Parse input into folder structure
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
            folders[current_folder] = []
        elif line.startswith('- '):
            if current_folder is not None:
                entry = line[2:].strip()
                folders[current_folder].append(entry)

    def process_folder(folder_id, parent_deletable=False):
        total = 0
        if folder_id not in folders:
            return 0
            
        for item in folders[folder_id]:
            if '[FOLDER' in item:
                next_folder = item.split('[FOLDER')[1].strip(']')
                # Logical error: not considering parent folder's deletable status
                is_deletable = should_delete(item.split(' [')[0])
                total += process_folder(next_folder, is_deletable)
            else:
                name, size = item.rsplit(' ', 1)
                # Logical error: only checking file name, not considering parent folder
                if should_delete(name):
                    total += int(size)
                    
        return total

    return process_folder('0')

if __name__ == '__main__':
    data = [
        "Folder: 0",
        "- taskmgr.exe 5065932",
        "- TEMPORARY_573 5048816",
        "- DELETE_708 2054307",
        "- temporary_023 [FOLDER 1]"
    ]
    print(solution(data))