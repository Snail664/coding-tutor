# The Purge

**Topics:** Graph, Depth-First Search, Hash Table

Your company's database is running critically low on storage, and the boss has tasked the team with clearing out unnecessary files to free up space. Upon inspection, you notice that the database is cluttered with outdated files and folders left over from past projects. Many of these files are stored in directories labeled with names like `TEMPORARY` or `DELETE LATER`.

The boss has made it clear: any file or folder containing the words **delete** or **temporary** is safe to remove, but how much disk space can be reclaimed? It's one thing to total all the files containing `delete` or `temporary`, but if a folder name contains one of these keywords, then everything within that folder (including all subfolders and their contents) must also be deleted. This means you may need to dig through multiple layers of folders to calculate the total size of deletable files.

## Example

The root directory of the company's database is referred to as Folder 0. All other folders and files are organized within it. Let's look at a small example:

#### Folder: 0

- `taskmgr.exe` (5065932 bytes)
- `Customer_Feedback_Compilation_2024.xlsx` (2646384 bytes)
- `VLC-3.0.16-win64.exe` (3971817 bytes)
- `ProductLaunch2024.png` (3712336 bytes)
- `temporary_573` (5048816 bytes)
- `delete_708` (2054307 bytes)
- `temporary_023` [FOLDER 1]


#### Folder: 1

- `Conference_Break_Music.mp3` (5179931 bytes)
- `SlackSetup-x64-4.3.2.exe` (2384929 bytes)
- `Strategic_Plans` [FOLDER 2]
- `Client_Dinner_Mar_2024.jpeg` (5364778 bytes)
- `FileZilla_3.55.1_win64-setup.exe` (4623628 bytes)
- `Charity_Event_011524.HEIC` (2134414 bytes)
- `Office_Christmas_Party_2023.jpeg` (687062 bytes)


#### Folder: 2

- `Product_Video_Soundtrack.aiff` (813896 bytes)
- `Operations_Manuals` [FOLDER 3]
- `Signed_NDA_JohnDoe_021523.pdf` (3257437 bytes)
- `delete_930` (9940460 bytes)
- `Client_Acquisition_Strategies` [FOLDER 4]
- `temporary_493` (1332303 bytes)
- `Marketing_Brochure_Image1.PSD` (5913782 bytes)


#### Folder: 3

- `ProductLaunch2024.png` (4396529 bytes)
- `Motivational_Morning_Playlist.m3u` (5619626 bytes)
- `Network_Configuration_Settings.txt` (1068226 bytes)
- `CRM_Database_Export_021724.csv` (5812973 bytes)
- `Competitor_Analysis_0224.pdf` (1088620 bytes)
- `Employee_Training_Videos_Link.txt` (267104 bytes)
- `delete_530` (7150742 bytes)


#### Folder: 4

- `temporary_751` (1051994 bytes)
- `delete_208` (6042521 bytes)
- `Logo_Rebrand_Options.svg` (3438585 bytes)
- `Node-v14.17.3-x64.msi` (2056068 bytes)
- `Expense_Report_Jan_2024.pdf` (5775782 bytes)
- `user32.dll` (2371618 bytes)
- `delete_027` (9003131 bytes)


### Explanation

Folder 0 contains one deletable file, `delete_708`, which is 2054307 bytes in size. It also contains a folder named `temporary_023`. Since the folder name includes the word **temporary**, everything inside it will also be deleted.

To calculate the total size of deletable files in Folder 1 (`temporary_023`) and its subfolders, you must traverse through all its contents, including Folders 2, 3, and 4.

For example:

* Folder 2 includes folders like Operations Manuals [Folder 3] and Client Acquisition Strategies [Folder 4], so their contents must also be included.
* Files such as `delete_027`, located in Folder 4, are already covered because their parent folder is marked for deletion.

Once you traverse the entire file structure, the total number of deletable bytes is **103,879,262**.

### Your Task

Traverse through the files and folders in your input data, totaling the sizes of all files that should be deleted because either the filename or one of its containing folders includes the phrase **delete** or **temporary**. The total number of deletable bytes is your answer value.

Be careful not to double-count files! For instance, if a file like `delete_027` resides in a folder already marked for deletion, its size should not be counted separately.