import { QuestionT } from "./types";
import { LanguageName, QuestionDifficulty } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

export const QUESTIONS: QuestionT[] = [
  {
    name: "Broken Firewall",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/BrokenFirewall.md"),
      "utf-8"
    ),
    tags: [{ name: "Bit Manipulation" }, { name: "Math" }, { name: "String" }],
    testCases: [
      {
        input: [
          /** simple */
          "450000640000000083069f3fc0a80001c0a80002", // size: 100, src: 192.168.0.1, dst: 192.168.0.2
          "450000c80000000083069f3f0A0000010A000002", // size: 200, src: 10.0.0.1, dst: 10.0.0.2
          "4500012c0000000083069f3fc0a800030A000003", // size: 300, src: 192.168.0.3, dst: 10.0.0.3
          "450001900000000083069f3f0A000004c0a80004",
        ],
        expectedOutput: "800/900",
        description: "simple test",
      },
      {
        input: [
          /** Medium test: mixed traffic patterns */
          "450000640000000083069f3fc0a80001c0a80002",
          "450000c80000000083069f3f0A0000010A000002",
          "4500012c0000000083069f3f8c7b00010A000003",
          "450001900000000083069f3fc0a80003d4287b04",
          "450002580000000083069f3f0A000005ae241b06",
          "450003200000000083069f3fae241b07c0a80006",
        ],
        expectedOutput: "1300/1100",
        description: "medium test",
      },
      {
        input: [
          /** Hard test: edge cases and boundary values */
          "45000001000000008306f39fc0a87f01c0a8ff02", // size: 1, src: 192.168.127.1, dst: 192.168.255.2
          "45000002000000008306f39fc0a80001c0a80000", // size: 2, src: 192.168.0.1, dst: 192.168.0.0
          "45000004000000008306f39fc0a8fe01c0a8fffe", // size: 4, src: 192.168.254.1, dst: 192.168.255.254
          "45000008000000008306f39f0A00ff010A00ff02", // size: 8, src: 10.0.255.1, dst: 10.0.255.2
          "45000010000000008306f39f0A0000010A000000", // size: 16, src: 10.0.0.1, dst: 10.0.0.0
          "45000020000000008306f39f0A00fe010A00fffe", // size: 32, src: 10.0.254.1, dst: 10.0.255.254
          "45ffffff000000008306f39fc0a80001c0a80002", // size: 65535, src: 192.168.0.1, dst: 192.168.0.2
          "45ffff00000000008306f39f0A0000010A000002", // size: 65280, src: 10.0.0.1, dst: 10.0.0.2
        ],
        expectedOutput: "65542/65328",
        description: "challenging test",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

char* solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
`,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Busy Moon Rovers",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/BusyMoonRovers.md"),
      "utf8"
    ),
    tags: [{ name: "Graph" }, { name: "Matrix" }, { name: "String Parsing" }],
    testCases: [
      {
        input: {
          locations: ["base", "ta00", "cx22", "xj84"],
          distances: [
            [0, 55457, 63529, 61302],
            [55457, 0, 111890, 35768],
            [63529, 111890, 0, 98977],
            [61302, 35768, 98977, 0],
          ],
          routes: [
            "Rover 1 route: base -> cx22 -> ta00 -> base -> xj84 -> base",
            "Rover 2 route: base -> ta00 -> cx22 -> base -> xj84 -> base",
            "Rover 3 route: base -> xj84 -> base",
            "Rover 4 route: base -> ta00 -> base",
            "Rover 5 route: base -> cx22 -> base",
            "Rover 6 route: base -> xj84 -> cx22 -> base",
            "Rover 7 route: base -> ta00 -> xj84 -> base",
            "Rover 8 route: base -> cx22 -> ta00 -> xj84 -> base",
            "Rover 9 route: base -> ta00 -> cx22 -> xj84 -> base",
            "Rover 10 route: base -> cx22 -> base",
          ],
        },
        expectedOutput: 2171044,
        description: "simple test",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below as soon as possible
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Closest Star Systems",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/ClosestStarSystems.md"),
      "utf-8"
    ),
    tags: [
      { name: "Divide and Conquer" },
      { name: "Math" },
      { name: "Sorting" },
    ],
    testCases: [
      {
        input: [
          /**simple test */
          "Star A: 1.0, 0.0, 0.0, 0.0",
          "Star B: 1.0, 0.0, 2.0, 0.0",
          "Star C: 1.0, 2.0, 1.0, 0.0",
        ],
        expectedOutput: "2.0",
        description: "",
      },
      {
        input: [
          /** mix of +ve and -ve*/
          "Alpha: 3.5, 1.0, -1.0, 2.0", // 1.225,
          "Beta: 4.2, 2.0, -1.5, 2.5",
          "Gamma: 5.1, -1.0, 2.0, -2.0",
          "Delta: 2.8, -1.2, 2.3, -2.1",
          "Epsilon: 6.3, 3.0, -2.0, 3.0",
        ],
        expectedOutput: 0.374,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

double solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Connecting Train Stations",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/ConnectingTrainStations.md"),
      "utf-8"
    ),
    tags: [
      { name: "Combinatorics " },
      { name: "Dynamic Programming" },
      { name: "Recursion" },
    ],
    testCases: [
      {
        input: "856,40,12,1",
        expectedOutput: 12,
        description: "",
      },
      {
        input: /** middddd*/ "100,20,5,1",
        expectedOutput: 3127,
        description: "",
      },
      {
        input: /** to test stac overflow limit  */ "999999,40000,2000,1",
        expectedOutput: 7852401,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const string input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Galactic Bounty Contract",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/GalacticBountyContract.md"),
      "utf8"
    ),
    tags: [{ name: "Hash Table" }, { name: "String Parsing" }],
    testCases: [
      {
        input: [
          "AAA: Pilot 9997",
          "BBB: Discount 2886",
          "DDD: Fuel 3500",
          "CCC: Docking 9468",
          "BBB: Tax 9378",
          "AAA: Rebate 3103",
        ],
        expectedOutput: 3500,
        description: "Basic test",
      },
      {
        input: [
          "SuperSpace: Pilot 9997",
          "OrionTravles: Discount 2886",
          "Galactica: Pilot 3500",
          "SuperSpace: Tax 156",
          "EarthExpress: Pilot 9468",
          "OrionTravles: Pilot 9378",
          "SuperSpace: Discount 3103",
          "Galactica: Rebate 967",
        ],
        expectedOutput: 2533,
        description: "check if different length company names are handled",
      },
      {
        input: [
          "AAA: Pilot 3000",
          "AAA: Fuel 1000",
          "AAA: Maintenance 2000",
          "AAA: Docking 1000",
          "AAA: Tax 1000",
          "AAA: Rebate 500",
          "AAA: Discount 200",
          "BBB: Pilot 5000",
          "BBB: Fuel 1000",
          "BBB: Discount 200",
          "CCC: Discount 300",
          "CCC: Maintenance 1000",
        ],
        expectedOutput: 700,
        description: "check if all cost types are accounted for",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below as soon as possible
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Mining Tunnels",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/MiningTunnels.md"),
      "utf-8"
    ),
    tags: [
      { name: "Breadth-First Search" },
      { name: "Graph" },
      { name: "Shortest Path" },
    ],
    testCases: [
      {
        input: [
          /**simple test */ "1",
          "###########",
          "#.......$.#",
          "#.#######.#",
          "#.#.....#.#",
          "#.#.###.#.#",
          "#...#$#...#",
          "###########",
          "2",
          "###########",
          "#.#.....#.#",
          "#.#.###.#.#",
          "#.#.#.#.#.#",
          "#...#.#...#",
          "#.###.###.#",
          "###########",
        ],
        expectedOutput: 12,
        description: "",
      },
      {
        input: [
          /** multiple routes mid case */ "1",
          "#################",
          "#.....#...#....#",
          "#.###.#.#.#.##.#",
          "#.#$#...#...#$.#",
          "#.#.#########..#",
          "#...#.....#.#.#",
          "###.#.###.#.#.#",
          "#$..#.#$#.....#",
          "#.###.#.#######",
          "#.....#........#",
          "#################",
          "2",
          "#################",
          "#.###.#.#.#.#..#",
          "#.#.#.#.#.#.#.#",
          "#...#...#...#.#",
          "#.###########.#",
          "#.....#.......#",
          "#####.#.#######",
          "#.....#.......#",
          "#.#########.#.#",
          "#.............#",
          "#################",
        ],
        expectedOutput: 18,
        description: "",
      },
      {
        input: [
          /** to test edge cases */ "1",
          "#########################",
          "#.....#.......#...#....#",
          "#.###.#######.#.#.####.#",
          "#.#$#.....#...#.#....#.#",
          "#.#.#####.#.###.####.#.#",
          "#...#...#.#.#$....$#...#",
          "###.#.#.#.#.#########.##",
          "#$..#.#.#.#.........#..#",
          "#.###.#.#.###########..#",
          "#.....#.#.............##",
          "#.#####.###############.#",
          "#.......#.....#........#",
          "#########################",
          "2",
          "#########################",
          "#.###.#.#.#.#.#.#.#.#..#",
          "#.#.#.#.#.#.#.#.#.#.#.#",
          "#...#...#...#...#...#.#",
          "#.###################.#",
          "#.....#.......#.......#",
          "#####.#.#####.#.#######",
          "#.....#.#.....#.......#",
          "#.#####.#.#########.#.#",
          "#.......#.............#",
          "#.###################.#",
          "#.....#...............#",
          "#########################",
        ],
        expectedOutput: 42,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "The Purge",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/ThePurge.md"),
      "utf-8"
    ),
    tags: [
      { name: "Depth-First Search" },
      { name: "Graph" },
      { name: "Hash Table" },
    ],
    testCases: [
      {
        input: [
          /**simple test */ "Folder: 0",
          "- system32.dll 1048576",
          "- delete_me.tmp 2097152",
          "- temp_folder [FOLDER 1]",
          "- important.doc 512000",
          "Folder: 1",
          "- cache.tmp 3145728",
          "- log.txt 262144",
        ],
        expectedOutput: 6553600,
        description: "Basic folder structure test",
      },
      {
        input: [
          /** medium complexity test */ "Folder: 0",
          "- system.log 524288",
          "- temporary_files [FOLDER 1]",
          "- documents [FOLDER 2]",
          "- delete_old.txt 1048576",
          "Folder: 1",
          "- cache.dat 2097152",
          "- backup [FOLDER 3]",
          "- temp.log 1048576",
          "Folder: 2",
          "- important.doc 786432",
          "- delete_drafts [FOLDER 4]",
          "- final.pdf 2359296",
          "Folder: 3",
          "- temp_data.bin 4194304",
          "- logs [FOLDER 5]",
          "Folder: 4",
          "- draft1.doc 1572864",
          "- draft2.doc 2097152",
          "Folder: 5",
          "- debug.log 3145728",
          "- error.log 262144",
        ],
        expectedOutput: 16766848,
        description: "Nested folders with mixed content",
      },
      {
        input: [
          /** edge cases test */ "Folder: 0",
          "- TEMPORARY.dat 1024",
          "- not_temporary.txt 2048",
          "- backup [FOLDER 1]",
          "- delete [FOLDER 2]",
          "Folder: 1",
          "- temp_delete [FOLDER 3]",
          "- important.sys 4096",
          "- temporary [FOLDER 4]",
          "Folder: 2",
          "- file1.txt 8192",
          "- subfolder [FOLDER 5]",
          "- temporary_delete [FOLDER 6]",
          "Folder: 3",
          "- delete.tmp 16384",
          "- data.bin 32768",
          "Folder: 4",
          "- cache.tmp 65536",
          "- DELETE.log 131072",
          "Folder: 5",
          "- temp.dat 262144",
          "- backup.sys 524288",
          "Folder: 6",
          "- temporary.log 1048576",
          "- delete.dat 2097152",
          "- nested [FOLDER 7]",
          "Folder: 7",
          "- final_delete.txt 4194304",
          "- TEMPORARY_FINAL.dat 8388608",
        ],
        expectedOutput: 16776192,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

double solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Time To Play Fair",
    difficulty: QuestionDifficulty.easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/TimeToPlayFair.md"),
      "utf-8"
    ),
    tags: [{ name: "Graph" }, { name: "Matrix" }, { name: "String" }],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code here
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

string solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
    testCases: [
      {
        input: [/** simple test */ "moonbase", "ht tphs rx"],
        expectedOutput: "hi there x",
        description: "Basic test with simple key and short message",
      },
      {
        input: [
          /** Mmid test */ "jupiter station",
          "br gh kt xc ui mp kl ej sx nv ah",
        ],
        expectedOutput: "message from jupiter basex",
        description: "Tests j->i conversion and odd length word handling",
      },
      {
        input: [
          /** edge cases test*/ "zzzz",
          "ax bx cx dx ex fx gx hx ix kx lx mx nx px qx rx sx tx ux vx wx yx zx",
        ],
        expectedOutput: "the quick brown fox jumps over the lazy dogx",
        description: "",
      },
    ],
  },

  {
    name: "Codey's Tutor Challenge",
    difficulty: QuestionDifficulty.medium,
    content: readFileSync(
      join(__dirname, "../assets/questions/CodeyTutorChallenge.md"),
      "utf8"
    ),
    tags: [
      { name: "Greedy" },
      { name: "Heap (Priority Queue)" },
      { name: "Sorting" },
    ],
    testCases: [
      {
        input: [
          "9",
          "add 8 10",
          "add 3 25",
          "add 5 6",
          "tutor 7",
          "tutor 7",
          "add 1 9",
          "add 2 13",
          "tutor 20",
          "tutor 1",
        ],
        expectedOutput: [6, 25, 32, 0],
        description: "",
      },
      {
        input: [
          "6",
          "add 100000 100000",
          "tutor 99999",
          "add 1 100000",
          "tutor 100000",
          "add 50000 1",
          "tutor 100000",
        ],
        expectedOutput: [0, 100000, 100001],
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

vector<int> solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Rotting Oranges",
    difficulty: QuestionDifficulty.medium,
    content: readFileSync(
      join(__dirname, "../assets/questions/RottingOranges.md"),
      "utf-8"
    ),
    tags: [
      { name: "Breadth-First Search" },
      { name: "Graph" },
      { name: "Matrix" },
      { name: "Queue" },
    ],
    testCases: [
      {
        input: [
          /** Simple test: small matrix, clear path */
          [[2,1,1],
          [1,1,0],
          [0,1,1]],
        ],
        expectedOutput: 4,
        description: "",
      },
      {
        input: [
          /** Medium test: larger matrix, negative impact of wrong implementation */
          [[2,1,1,1,1],
          [1,1,0,1,1],
          [0,0,0,2,1],
          [1,1,1,1,1],
          [1,1,1,1,1]],
        ],
        expectedOutput: 1150,
        description: "",
      },
      {
        input: [
          /** Hard test: edge cases with large numbers and precision */
          [[2,1,1,1,1],
          [1,1,0,1,1],
          [0,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,1]],
        ],
        expectedOutput: -1,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Supply Squad",
    difficulty: QuestionDifficulty.medium,
    content: readFileSync(
      join(__dirname, "../assets/questions/SupplySquad.md"),
      "utf-8"
    ),
    tags: [
      { name: "Backtracking" },
      { name: "Dynamic Programming" },
      { name: "Graph" },
      { name: "Heap (Priority Queue)" },
      { name: "Shortest Path" },
    ],
    testCases: [
      {
        input: [
          /** Simple test: small matrix, clear path */ "alpha bravo charlie",
          "alpha 0 10 20",
          "bravo 10 0 15",
          "charlie 20 15 0",
        ],
        expectedOutput: 45,
        description: "",
      },
      {
        input: [
          /** Medium test: larger matrix, negative impact of wrong implementation */
          "base camp ridge peak valley",
          "base 0 100 500 300",
          "camp 100 0 200 400",
          "ridge 500 200 0 250",
          "peak 300 400 250 0",
        ],
        expectedOutput: 1150,
        description: "",
      },
      {
        input: [
          /** Hard test: edge cases with large numbers and precision */
          "s1 s2 s3 s4 s5 s6",
          "s1 0 999999 1000 500000 2000 3000",
          "s2 999999 0 888888 777777 666666 555555",
          "s3 1000 888888 0 444444 333333 222222",
          "s4 500000 777777 444444 0 111111 100000",
          "s5 2000 666666 333333 111111 0 50000",
          "s6 3000 555555 222222 100000 50000 0",
        ],
        expectedOutput: 2164444,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

double solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Cosmic Candy Crush",
    difficulty: QuestionDifficulty.hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/CosmicCandyCrush.md"),
      "utf8"
    ),
    tags: [
      { name: "Divide and Conquer" },
      { name: "Dynamic Programming" },
      { name: "Memoization" },
    ],
    testCases: [
      {
        input: [3, 1, 5, 8],
        expectedOutput: 167,
        description: "",
      },
      {
        input: [1, 5],
        expectedOutput: 10,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
  {
    name: "Magical Median Challenge",
    difficulty: QuestionDifficulty.hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/MagicalMedianChallenge.md"),
      "utf8"
    ),
    tags: [
      { name: "Binary Search" },
      { name: "Divide and Conquer" },
      { name: "Math" },
      { name: "Sorting" },
    ],
    testCases: [
      {
        input: [[1, 3], [2]],
        expectedOutput: 2,
        description: "",
      },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expectedOutput: 2,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.python,
      },
      {
        code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int solution(const vector<string>& input) {
    // Insert your code below here
    
    } 
        `,
        language: LanguageName.cpp,
      },
    ],
  },
];
