def solution(data):
    folders = {}
    current_folder = None
    folder_hierarchy = {}  # trying to track parent-child relationships
    
    # First parse all the data into a structure we can work with
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
            folders[current_folder] = []
        elif line.startswith('- '):
            if current_folder is not None:
                item = line[2:].strip()
                folders[current_folder].append(item)
                # Track folder relationships
                if '[FOLDER' in item:
                    child_folder = item.split('[FOLDER')[1].strip(']')
                    folder_hierarchy[child_folder] = current_folder

    def calculate_size(folder_id):
        total = 0
        items = folders.get(folder_id, [])
        
        for item in items:
            if '[FOLDER' not in item:
                # Regular file
                name, size = item.rsplit(' ', 1)
                if 'delete' in name.lower() or 'temporary' in name.lower():
                    total += int(size)
            else:
                # It's a subfolder
                folder_name = item.split(' [')[0]
                next_folder = item.split('[FOLDER')[1].strip(']')
                
                # Getting stuck here - not sure if I should:
                # 1. Check if current folder name has delete/temporary
                # 2. Or check if parent folder was marked for deletion
                # 3. How to pass this information to recursive calls
                
                subfolder_size = calculate_size(next_folder)
                # Not sure if I should always add subfolder_size
                # or only if the folder name contains delete/temporary
                total += subfolder_size
        
        return total
    
    # This gets some of the files but misses ones that should be deleted
    # because their parent folder is marked for deletion
    return calculate_size('0')

if __name__ == '__main__':
    data = [
        "Folder: 0",
        "- taskmgr.exe 5065932",
        "- temporary_573 5048816",
        "- delete_708 2054307",
        "- temporary_023 [FOLDER 1]"
    ]
    print(solution(data))