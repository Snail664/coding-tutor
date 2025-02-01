# Solution 3: Graph-based approach with topological processing
from collections import defaultdict

def solution(data):
    # Create graph structure
    graph = defaultdict(dict)
    folder_data = defaultdict(list)
    current_folder = None
    
    # Build graph and collect folder data
    for line in data:
        if line.startswith('Folder:'):
            current_folder = line.split(' ')[1]
        elif line.startswith('- '):
            item = line[2:].strip()
            folder_data[current_folder].append(item)
            if '[FOLDER' in item:
                child_folder = item.split('[FOLDER')[1].strip(']')
                folder_name = item.split(' [')[0]
                graph[current_folder][child_folder] = folder_name

    def calculate_folder_size(folder_id, deletable_paths):
        total = 0
        current_path = deletable_paths.copy()
        
        # Process current folder's contents
        for item in folder_data[folder_id]:
            if '[FOLDER' in item:
                # Handle subfolder
                next_folder = item.split('[FOLDER')[1].strip(']')
                folder_name = item.split(' [')[0]
                
                # Check if current folder should be deleted
                if ('delete' in folder_name.lower() or 'temporary' in folder_name.lower()):
                    current_path.add(next_folder)
                    
                total += calculate_folder_size(next_folder, current_path)
            else:
                # Handle file
                name, size = item.rsplit(' ', 1)
                if (folder_id in deletable_paths or 
                    'delete' in name.lower() or 
                    'temporary' in name.lower()):
                    total += int(size)
                    
        return total

    # Start processing from root folder
    return calculate_folder_size('0', set())

if __name__ == '__main__':
    data = [
        "Folder: 0",
        "- taskmgr.exe 5065932",
        "- Customer_Feedback_Compilation_2024.xlsx 2646384",
        "- VLC-3.0.16-win64.exe 3971817",
        "- ProductLaunch2024.png 3712336",
        "- temporary_573 5048816",
        "- delete_708 2054307",
        "- temporary_023 [FOLDER 1]",
        "Folder: 1",
        "- Conference_Break_Music.mp3 5179931",
        "- SlackSetup-x64-4.3.2.exe 2384929",
        "- Strategic_Plans [FOLDER 2]",
        "- Client_Dinner_Mar_2024.jpeg 5364778",
        "- FileZilla_3.55.1_win64-setup.exe 4623628",
        "- Charity_Event_011524.HEIC 2134414",
        "- Office_Christmas_Party_2023.jpeg 687062",
        "Folder: 2",
        "- Product_Video_Soundtrack.aiff 813896",
        "- Operations_Manuals [FOLDER 3]",
        "- Signed_NDA_JohnDoe_021523.pdf 3257437",
        "- delete_930 9940460",
        "- Client_Acquisition_Strategies [FOLDER 4]",
        "- temporary_493 1332303",
        "- Marketing_Brochure_Image1.PSD 5913782",
        "Folder: 3",
        "- ProductLaunch2024.png 4396529",
        "- Motivational_Morning_Playlist.m3u 5619626",
        "- Network_Configuration_Settings.txt 1068226",
        "- CRM_Database_Export_021724.csv 5812973",
        "- Competitor_Analysis_0224.pdf 1088620",
        "- Employee_Training_Videos_Link.txt 267104",
        "- delete_530 7150742",
        "Folder: 4",
        "- temporary_751 1051994",
        "- delete_208 6042521",
        "- Logo_Rebrand_Options.svg 3438585",
        "- Node-v14.17.3-x64.msi 2056068",
        "- Expense_Report_Jan_2024.pdf 5775782",
        "- user32.dll 2371618",
        "- delete_027 9003131"
    ]
    print(solution(data))  # Should print: 103879262