import { LanguageName, QuestionDifficulty, QuestionT } from "./types";
// import { readFileSync } from "fs";
// import { join } from "path";
import PurchaseTicketsContent from "../assets/questions/PurchaseTickets.md";
import BrokenFirewallContent from "../assets/questions/BrokenFirewall.md";
import HotelDoorCodeContent from "../assets/questions/HotelDoorCode.md";
import ClosestStarSystemsContent from "../assets/questions/ClosestStarSystems.md";
import BusyMoonRoversContent from "../assets/questions/BusyMoonRovers.md";
import TimeToPlayFairContent from "../assets/questions/TimeToPlayFair.md";
import ThePurgeContent from "../assets/questions/ThePurge.md";
import ConnectingCitiesContent from "../assets/questions/ConnectingCities.md";
import MiningTunnelsContent from "../assets/questions/MiningTunnels.md";

export const QUESTIONS: QuestionT[] = [
  {
    name: "Purchase Tickets",
    difficulty: QuestionDifficulty.Easy,
    content: PurchaseTicketsContent,
    testCases: [
      {
        input: [
          "AAA: Seat 9997",
          "BBB: Discount 2886",
          "DDD: Luggage 3500",
          "AAA: Tax 156",
          "CCC: Fee 9468",
          "BBB: Fee 9378",
          "AAA: Discount 3103",
          "DDD: Rebate 967",
        ],
        expectedOutput: 2454,
        description: "",
      },
      {
        input: [
          "AAA: Seat 9997",
          "BBB: Discount 2886",
          "DDD: Luggage 3500",
          "CCC: Fee 9468",
          "BBB: Fee 9378",
          "AAA: Discount 3103",
        ],
        expectedOutput: 200,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Broken Firewall",
    difficulty: QuestionDifficulty.Medium,
    content: BrokenFirewallContent,
    testCases: [
      {
        input: [ /** simple */
          '450000640000000083069f3fc0a80001c0a80002', 
          '450000c80000000083069f3f0A0000010A000002', 
          '4500012c0000000083069f3fc0a800030A000003', 
          '450001900000000083069f3f0A000004c0a80004'  
        ],
        expectedOutput: "700/900",  
        description: "",
      },
      {
        input: [ /** Medium test: mixed traffic patterns */
          '450000640000000083069f3fc0a80001c0a80002', 
          '450000c80000000083069f3f0A0000010A000002', 
          '4500012c0000000083069f3f8c7b00010A000003', 
          '450001900000000083069f3fc0a80003d4287b04', 
          '450002580000000083069f3f0A000005ae241b06', 
          '450003200000000083069f3fae241b07c0a80006'  
        ],
        expectedOutput: "1300/1100", 
        description: "",
      },
      {
        input: [ /** Hard test: edge cases and boundary values */
          '45000001000000008306f39fc0a87f01c0a8ff02', 
          '45000002000000008306f39fc0a80001c0a80000', 
          '45000004000000008306f39fc0a8fe01c0a8fffe', 
          '45000008000000008306f39f0A00ff010A00ff02', 
          '45000010000000008306f39f0A0000010A000000', 
          '45000020000000008306f39f0A00fe010A00fffe', 
          '45ffffff000000008306f39fc0a80001c0a80002', 
          '45ffff00000000008306f39f0A0000010A000002'  
        ],
        expectedOutput: "16777224/56", 
        description: "",
      }
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Hotel Door Code",
    difficulty: QuestionDifficulty.Hard,
    content: HotelDoorCodeContent,
    testCases: [
      {
        input: [ /**simple original test */
          "12 6 4 1 9 5 5 1 9 1 7"
        ],
        expectedOutput: "",
        description: "",
      },
      {
        input: [ /** medium test */
          "10 5 15 5 10 5 15 5 10 5 " +  // top of 3
          "15 5 10 5 15 5 10 5 15 5 " +  // middle of 3
          "10 5 15 5 10 5 15 5 10 5 " +  // bottom of 3
          "20 5 15 5 20 5 15 5 20 5 " +  // top of 5
          "15 5 20 5 15 5 20 5 15 5"     // bottom of 5
        ],
        expectedOutput: "35",
        description: "",
      },
      {
        input: [ /** Hard test: edge cases */
          "99 1 " +                    // Tests exact width boundary
          "50 50 " +                   // Tests mid-row transition
          "100 " +                     // Tests full row fill
          "1 99 " +                    // Tests row start
          "98 1 1 " +                  // Tests row end
          "200 " +                     // Tests multi-row span
          "8000"                       // Tests maximum pixel count
        ],
        expectedOutput: "7",
        description: "",
      }
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Closest Star Systems",
    difficulty: QuestionDifficulty.Hard,
    content: ClosestStarSystemsContent,
    testCases: [
      {
        input: [ /**simple test */
          "Star A: 1.0, 0.0, 0.0, 0.0",
          "Star B: 1.0, 0.0, 2.0, 0.0",
          "Star C: 1.0, 2.0, 1.0, 0.0",
        ],
        expectedOutput: 2.0,
        description: "",
      },
      {
        input: [ /** mix of +ve and -ve*/
          "Alpha: 3.5, 1.0, -1.0, 2.0",
          "Beta: 4.2, 2.0, -1.5, 2.5",
          "Gamma: 5.1, -1.0, 2.0, -2.0",
          "Delta: 2.8, -1.2, 2.3, -2.1",
          "Epsilon: 6.3, 3.0, -2.0, 3.0"
        ],
        expectedOutput: 0.458,
        description: "",
      },
      {
        input: [ /** edge caase  */
          "Star-A1: 1e5, 2e5, 3e5, 0.0",
          "Star-A2: 1e5, 2e5, 3e5, 0.0",
          "Star-A3: 1e5, 2e5, 3e5 + 0.1, 0.0",
        ],
        expectedOutput: 0.1,
        description: "",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Busy Moon Rovers",
    difficulty: QuestionDifficulty.Hard,
    content: BusyMoonRoversContent,
    testCases: [
      {
        input: [ /** Simple test: small matrix, clear path */
          "alpha bravo charlie",
          "alpha 0 10 20",
          "bravo 10 0 15",
          "charlie 20 15 0"
        ],
        expectedOutput: 45,  
        description: "",
      },
      {
        input: [ /** Medium test: larger matrix, negative impact of wrong implementation */
          "base camp ridge peak valley",
          "base 0 100 500 300",
          "camp 100 0 200 400",
          "ridge 500 200 0 250",
          "peak 300 400 250 0"
        ],
        expectedOutput: 1150,  
        description: "",
      },
      {
        input: [ /** Hard test: edge cases with large numbers and precision */
          "s1 s2 s3 s4 s5 s6",
          "s1 0 999999 1000 500000 2000 3000",
          "s2 999999 0 888888 777777 666666 555555",
          "s3 1000 888888 0 444444 333333 222222",
          "s4 500000 777777 444444 0 111111 100000",
          "s5 2000 666666 333333 111111 0 50000",
          "s6 3000 555555 222222 100000 50000 0"
        ],
        expectedOutput: 2164444,  
        description: "",
      }
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Time To Play Fair",
    difficulty: QuestionDifficulty.Hard,
    content: TimeToPlayFairContent,
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code here
`,
        language: LanguageName.Python,
      },
    ],
    testCases: [
      {
        input: [ /** simple test */
          "moonbase",
          "ht tphs rx"
        ],
        expectedOutput: "hi there x",
        description: "Basic test with simple key and short message",
      },
      {
        input: [ /** Mmid test */
          "jupiter station",
          "br gh kt xc ui mp kl ej sx nv ah"
        ],
        expectedOutput: "message from jupiter basex",
        description: "Tests j->i conversion and odd length word handling",
      },
      {
        input: [ /** edge cases test*/
          "zzzz",
          "ax bx cx dx ex fx gx hx ix kx lx mx nx px qx rx sx tx ux vx wx yx zx"
        ],
        expectedOutput: "the quick brown fox jumps over the lazy dogx",
        description: "",
      }
    ],
  },
  {
    name: "The Purge",
    difficulty: QuestionDifficulty.Hard,
    content: ThePurgeContent,
    testCases: [
      {
        input: [ /**simple test */
          "Folder: 0",
          "- system32.dll 1048576",
          "- delete_me.tmp 2097152",
          "- temp_folder [FOLDER 1]",
          "- important.doc 512000",
          "Folder: 1",
          "- cache.tmp 3145728",
          "- log.txt 262144"
        ],
        expectedOutput: 6553600,
        description: "Basic folder structure test",
      },
      {
        input: [ /** medium complexity test */
          "Folder: 0",
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
          "- error.log 262144"
        ],
        expectedOutput: 16766848,
        description: "Nested folders with mixed content",
      },
      {
        input: [ /** edge cases test */
          "Folder: 0",
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
          "- TEMPORARY_FINAL.dat 8388608"
        ],
        expectedOutput: 16776192,
        description: "",
      }
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Connecting Cities",
    difficulty: QuestionDifficulty.Hard,
    content: ConnectingCitiesContent,
    testCases: [
      {
        input: [ /**simple test */
          "856,40,12,1"
        ],
        expectedOutput: 12,
        description: "",
      },
      {
        input: [ /** middddd*/
          "100,20,5,1"
        ],
        expectedOutput: 3127,
        description: "",
      },
      {
        input: [ /** to test stac overflow limit  */
          "999999,40000,2000,1"
        ],
        expectedOutput: 7852401,
        description: "skys the limit",
      },
    ],
    templateCodes: [
      {
        code: `def solution(data):
    # insert your code below
`,
        language: LanguageName.Python,
      },
    ],
  },
  {
    name: "Mining Tunnels",
    difficulty: QuestionDifficulty.Hard,
    content: MiningTunnelsContent,
    testCases: [
      {
        input: [ /**simple test */
          "1",
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
          "###########"
        ],
        expectedOutput: 12,
        description: "",
      },
      {
        input: [ /** multiple routes mid case */
          "1",
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
          "#################"
        ],
        expectedOutput: 18,
        description: "",
      },
      {
        input: [ /** to test edge cases */
          "1",
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
          "#########################"
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
        language: LanguageName.Python,
      },
    ],
  },
];
