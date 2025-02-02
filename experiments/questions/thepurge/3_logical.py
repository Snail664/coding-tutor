from collections import defaultdict

def solution(data):
    # Logical error: using wrong data structure
    graph = {}
    folder_data = []
    current_folder = None
    
    # Build graph with logical errors
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
            # Logical error: not initializing folder data properly
            folder_data.append([])
        elif line.startswith('- '):
            item = line[2:].strip()
            # Logical error: wrong data structure access
            folder_data[-1].append(item)
            if '[FOLDER' in item:
                child_folder = item.split('[FOLDER')[1].strip(']')
                # Logical error: incorrect graph structure
                graph[child_folder] = current_folder

    def calculate_folder_size(folder_id, deletable_paths):
        total = 0
        # Logical error: not copying deletable_paths
        current_path = deletable_paths
        
        # Logical error: wrong folder data access
        for item in folder_data[int(folder_id)]:
            if '[FOLDER' in item:
                next_folder = item.split('[FOLDER')[1].strip(']')
                folder_name = item.split(' [')[0]
                
                # Logical error: case-sensitive check
                if ('DELETE' in folder_name or 'TEMPORARY' in folder_name):
                    current_path.add(next_folder)
                    
                total += calculate_folder_size(next_folder, current_path)
            else:
                name, size = item.rsplit(' ', 1)
                # Logical error: incorrect deletion condition
                if folder_id in deletable_paths:
                    total += int(size)
                    
        return total

    return calculate_folder_size('0', set())

if __name__ == '__main__':
    data = [
        "Folder: 0",
        "- taskmgr.exe 5065932",
        "- TEMPORARY_573 5048816",
        "- DELETE_708 2054307",
        "- temporary_023 [FOLDER 1]"
    ]
    print(solution(data))