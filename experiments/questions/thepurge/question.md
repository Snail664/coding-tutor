# The Purge

You try to download all the photos your sister sends you, but your phone produces an error message that there isn't enough space available. It seems all your constant programming and tinkering has left your phone filled with a lot of unnecessary files. For instance, you see a lot of folders with names like `TEMPORARY` or `DELETE LATER`.

You decide to take a few minutes to clean up the file system on your phone. Obviously, you need to be careful not to delete any files your phone actually needs to operate.

Any file or folder containing the word **delete** or **temporary** is safe to delete, but how much disk space will it free up? It's one thing to total all the files containing `delete` or `temporary`, but if a folder name contains it, then you will also be deleting all the files contained within that folder (regardless of their names), plus any subfolders within the offending folder! You could find yourself going into multiple layers of folders to total all the file sizes!

### Example

Folder 0 is always the starting point of your search, and everything else is contained within it. On a Mac, this might be folder `/`, or on Windows, this could be your `C:/`.

Let's look at a small example:

#### Folder: 0
- `taskmgr.exe` 5065932
- `Customer_Feedback_Compilation_2024.xlsx` 2646384
- `VLC-3.0.16-win64.exe` 3971817
- `ProductLaunch2024.png` 3712336
- `temporary_573` 5048816
- `delete_708` 2054307
- `temporary_023` [FOLDER 1]

#### Folder: 1
- `Conference_Break_Music.mp3` 5179931
- `SlackSetup-x64-4.3.2.exe` 2384929
- `Strategic_Plans` [FOLDER 2]
- `Client_Dinner_Mar_2024.jpeg` 5364778
- `FileZilla_3.55.1_win64-setup.exe` 4623628
- `Charity_Event_011524.HEIC` 2134414
- `Office_Christmas_Party_2023.jpeg` 687062

#### Folder: 2
- `Product_Video_Soundtrack.aiff` 813896
- `Operations_Manuals` [FOLDER 3]
- `Signed_NDA_JohnDoe_021523.pdf` 3257437
- `delete_930` 9940460
- `Client_Acquisition_Strategies` [FOLDER 4]
- `temporary_493` 1332303
- `Marketing_Brochure_Image1.PSD` 5913782

#### Folder: 3
- `ProductLaunch2024.png` 4396529
- `Motivational_Morning_Playlist.m3u` 5619626
- `Network_Configuration_Settings.txt` 1068226
- `CRM_Database_Export_021724.csv` 5812973
- `Competitor_Analysis_0224.pdf` 1088620
- `Employee_Training_Videos_Link.txt` 267104
- `delete_530` 7150742

#### Folder: 4
- `temporary_751` 1051994
- `delete_208` 6042521
- `Logo_Rebrand_Options.svg` 3438585
- `Node-v14.17.3-x64.msi` 2056068
- `Expense_Report_Jan_2024.pdf` 5775782
- `user32.dll` 2371618
- `delete_027` 9003131

Folder 0 contains 1 file for deletion, `delete_708` of size 2054307. Folder 0 also contains a folder called `temporary_023`. Due to the name of the folder, everything within it will also get deleted. To total the disk space consumed by the files in `temporary_023`, you need to go through the contents of that folder, which includes [FOLDER 1].

Jump to folder 1, and total all the files within it, plus [FOLDER 2] inside it.

Folder 2 contains folder 3 and folder 4, so the file sizes in those also need totaling.

Converting the folder numbers to their folder names, the above structure could be visualized as:

```
/
+-- temporary_023
    +-- Strategic_Plans
        +-- Operations_Manuals
        +-- Client_Acquisition_Strategies
```

Once you have traversed the entire folder structure in this example, the total bytes that would be freed up are **103,879,262**, which would be the answer.

Be aware that as you are totaling files to be deleted, take care not to double-count some files. For instance, the file `delete_027` inside folder 4 is already getting deleted due to the folder it resides in, so the file size doesn't need counting separately.

### Your Task

Traverse through the files and folders in your input data, totaling the sizes of all files that should be deleted because either the filename, or one of the containing folders of a file, contains the phrase **delete** or **temporary**. The total number of bytes to be deleted is your answer value.