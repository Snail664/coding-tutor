# Solution 1: Recursive DFS with Path Tracking

def should_delete(name):
    return 'delete' in name.lower() or 'temporary' in name.lower()

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
                entry = line[2:].strip()  # Remove "- " prefix
                folders[current_folder].append(entry)

    def process_folder(folder_id, parent_deletable=False):
        total = 0
        if folder_id not in folders:
            return 0
            
        for item in folders[folder_id]:
            if '[FOLDER' in item:
                # Extract next folder number
                next_folder = item.split('[FOLDER')[1].strip(']')
                # If parent is deletable or current folder is deletable, all subcontents are deleted
                is_deletable = parent_deletable or should_delete(item.split(' [')[0])
                total += process_folder(next_folder, is_deletable)
            else:
                # Process file
                name, size = item.rsplit(' ', 1)
                # Add size if parent folder is deletable or file itself should be deleted
                if parent_deletable or should_delete(name):
                    total += int(size)
                    
        return total

    return process_folder('0')

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