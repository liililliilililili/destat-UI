import type { Address } from "viem";

export const SURVEY_FACTORY_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3" as Address;

export const SURVEY_FACTORY_ABI = [
  {
    type: "function",
    name: "createSurvey",
    stateMutability: "payable",
    inputs: [
      {
        name: "_survey",
        type: "tuple",
        components: [
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "targetNumber", type: "uint256" },
          {
            name: "questions",
            type: "tuple[]",
            components: [
              { name: "question", type: "string" },
              { name: "options", type: "string[]" },
            ],
          },
        ],
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getSurveys",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
      },
    ],
  },
] as const;

export const SURVEY_ABI = [
  {
    type: "function",
    name: "title",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "description",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "targetNumber",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "rewardAmount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "getQuestions",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "question", type: "string" },
          { name: "options", type: "string[]" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getAnswers",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "respondent", type: "address" },
          { name: "answers", type: "uint8[]" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "submitAnswer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_answer",
        type: "tuple",
        components: [
          { name: "respondent", type: "address" },
          { name: "answers", type: "uint8[]" },
        ],
      },
    ],
    outputs: [],
  },
] as const;
