import { LanguageName, QuestionDifficulty, QuestionT } from "./types";
import PurchaseTicketsContent from "@/assets/questions/PurchaseTickets.md";
import BrokenFirewallContent from "@/assets/questions/BrokenFirewall.md";
import HotelDoorCodeContent from "@/assets/questions/HotelDoorCode.md";
import ClosestStarSystemsContent from "@/assets/questions/ClosestStarSystems.md";
import BusyMoonRoversContent from "@/assets/questions/BusyMoonRovers.md";
import TimeToPlayFairContent from "@/assets/questions/TimeToPlayFair.md";
import ThePurgeContent from "@/assets/questions/ThePurge.md";
import ConnectingCitiesContent from "@/assets/questions/ConnectingCities.md";
import MiningTunnelsContent from "@/assets/questions/MinningTunnels.md";

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
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Hotel Door Code",
    difficulty: QuestionDifficulty.Hard,
    content: HotelDoorCodeContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Closest Star Systems",
    difficulty: QuestionDifficulty.Hard,
    content: ClosestStarSystemsContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Busy Moon Rovers",
    difficulty: QuestionDifficulty.Hard,
    content: BusyMoonRoversContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Time To Play Fair",
    difficulty: QuestionDifficulty.Hard,
    content: TimeToPlayFairContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "The Purge",
    difficulty: QuestionDifficulty.Hard,
    content: ThePurgeContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Connecting Cities",
    difficulty: QuestionDifficulty.Hard,
    content: ConnectingCitiesContent,
    templateCodes: [],
    testCases: [],
  },
  {
    name: "Mining Tunnels",
    difficulty: QuestionDifficulty.Hard,
    content: MiningTunnelsContent,
    templateCodes: [],
    testCases: [],
  },
];
