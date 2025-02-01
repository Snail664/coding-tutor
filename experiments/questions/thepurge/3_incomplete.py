def solution(data):
    # Trying to use a tree-like structure to track folder relationships
    class FolderNode:
        def __init__(self, name, size=0):
            self.name = name
            self.size = size
            self.children = []
            self.is_file = True
            self.parent = None
    
    def parse_size(item):
        try:
            return int(item.split()[-1])
        except:
            return 0
    
    # Build the folder tree
    root = FolderNode('0')
    current_node = root
    folder_map = {'0': root}
    
    for line in data:
        if line.startswith('Folder:'):
            folder_id = line.split(' ')[1]
            if folder_id not in folder_map:
                folder_map[folder_id] = FolderNode(folder_id)
            current_node = folder_map[folder_id]
        elif line.startswith('- '):
            item = line[2:].strip()
            if '[FOLDER' in item:
                # It's a subfolder reference
                folder_name = item.split(' [')[0]
                next_folder = item.split('[FOLDER')[1].strip(']')
                
                folder_node = FolderNode(folder_name)
                folder_node.is_file = False
                folder_node.parent = current_node
                current_node.children.append(folder_node)
                folder_map[next_folder] = folder_node
            else:
                # Regular file
                name = item.rsplit(' ', 1)[0]
                size = parse_size(item)
                file_node = FolderNode(name, size)
                file_node.parent = current_node
                current_node.children.append(file_node)
    
    def should_delete(node):
        # Check if current node or any parent has delete/temporary in name
        current = node
        while current:
            if 'delete' in current.name.lower() or 'temporary' in current.name.lower():
                return True
            current = current.parent
        return False
    
    total_size = 0

    # This attempt only gets partial results
    for folder_id, node in folder_map.items():
        if node.is_file and should_delete(node):
            total_size += node.size
    
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