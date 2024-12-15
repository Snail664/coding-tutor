import { LanguageName, QuestionDifficulty, QuestionT } from "./types";
import { readFileSync } from "fs";
import { join } from "path";

export const QUESTIONS: QuestionT[] = [
  {
    name: "Purchase Tickets",
    difficulty: QuestionDifficulty.Easy,
    content: readFileSync(
      join(__dirname, "../assets/questions/PurchaseTickets.md"),
      "utf8"
    ),
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
        expectedOutput: 2533,
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
        expectedOutput: 3500,
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
    content: readFileSync(
      join(__dirname, "../assets/questions/BrokenFirewall.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Hotel Door Code",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/HotelDoorCode.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Closest Star Systems",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/ClosestStarSystems.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Busy Moon Rovers",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/BusyMoonRovers.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Time To Play Fair",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/TimeToPlayFair.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "The Purge",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/ThePurge.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Connecting Cities",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/ConnectingCities.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Mining Tunnels",
    difficulty: QuestionDifficulty.Hard,
    content: readFileSync(
      join(__dirname, "../assets/questions/MiningTunnels.md"),
      "utf-8"
    ),
    templateCodes: [],
    testCases: [],
  },
];
