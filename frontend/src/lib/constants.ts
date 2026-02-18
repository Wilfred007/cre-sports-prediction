import { defineChain } from "thirdweb";

export const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

export const NETWORK = defineChain(11155111); // Sepolia

export const CONTRACT_ADDRESS = "0x8E33E3d7210FE64Add5e13aA9E84032f6756D65d";

export const ABI = [
    {
        "type": "function",
        "name": "nextMarketId",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createMarket",
        "inputs": [
            { "name": "question", "type": "string" },
            { "name": "deadline", "type": "uint48" }
        ],
        "outputs": [{ "name": "marketId", "type": "uint256" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "predict",
        "inputs": [
            { "name": "marketId", "type": "uint256" },
            { "name": "prediction", "type": "uint8" }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "requestSettlement",
        "inputs": [{ "name": "marketId", "type": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claim",
        "inputs": [{ "name": "marketId", "type": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getMarket",
        "inputs": [{ "name": "marketId", "type": "uint256" }],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "components": [
                    { "name": "creator", "type": "address" },
                    { "name": "createdAt", "type": "uint48" },
                    { "name": "deadline", "type": "uint48" },
                    { "name": "settledAt", "type": "uint48" },
                    { "name": "settled", "type": "bool" },
                    { "name": "confidence", "type": "uint16" },
                    { "name": "outcome", "type": "uint8" },
                    { "name": "totalYesPool", "type": "uint256" },
                    { "name": "totalNoPool", "type": "uint256" },
                    { "name": "question", "type": "string" }
                ]
            }
        ],
        "stateMutability": "view"
    }
] as const;
