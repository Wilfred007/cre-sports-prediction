# PredictChain: AI-Powered Decentralized Prediction Markets

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chainlink](https://img.shields.io/badge/Chainlink-CRE-blue.svg)
![Gemini](https://img.shields.io/badge/AI-Gemini-orange.svg)

PredictChain is a state-of-the-art decentralized prediction market platform that leverages **Chainlink Runtime Environment (CRE)** and **Google Gemini AI** to provide automated, trustless, and reliable market settlement.

Unlike traditional prediction markets that rely on manual or centralized oracles, PredictChain uses an AI-driven automated workflow to fetch real-time sports data and resolve market outcomes with zero human intervention.

## 🌟 Key Features

- **Decentralized Execution**: Fully on-chain market management on Ethereum Sepolia.
- **AI-Powered Settlement**: Uses Google Gemini 1.5 Flash to parse complex natural language questions and analyze match results.
- **Real-Time Data**: Integrated with ESPN's keyless API for up-to-the-minute sports results (Soccer, Basketball, Football).
- **Trustless Oracle Flow**: Powered by Chainlink CRE for secure, off-chain computation and verifiable on-chain reporting.
- **Modern UI**: A premium, responsive dashboard built with Next.js, Shadcn/UI, and Thirdweb.

## 🏗 Architecture Overview

PredictChain operates across three integrated layers:

### 1. Smart Contract Layer (`/contract`)
The core logic resides in `SportsPredictionMarket.sol`, a robust Solidity contract optimized for gas efficiency and security.
- **Market Management**: Users can create markets by defining a natural language question and a deadline.
- **Prediction Engine**: Secure handling of ETH-based predictions for "Yes" or "No" outcomes.
- **Claim Logic**: Automated distribution of winnings based on AI-verified results.
- **Receiver Interface**: Implements `IReceiver` to handle secure settlement reports from the Chainlink CRE.

### 2. CRE Workflow Layer (`/my-workflow`)
The intelligence of the system, powered by the Chainlink Runtime Environment.
- **Event Trigger**: Listens for `SettlementRequested` events on the blockchain.
- **AI Extraction**: Uses Gemini AI to transform natural language questions into structured API queries.
- **Data Acquisition**: Fetches match data from ESPN without requiring expensive private API keys.
- **Consensus & Reporting**: Generates a cryptographically signed report of the outcome for on-chain submission.

### 3. Frontend Dashboard (`/frontend`)
A seamless user experience built for speed and clarity.
- **Real-Time Updates**: Live market monitoring using Thirdweb SDK.
- **Intuitive Creation**: Advanced date/time management for market deadlines.
- **Clear Feedback**: Human-readable error decoding for ABI-level contract reverts.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for contract development)
- [Chainlink CRE SDK](https://docs.chain.link/)
- [Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/predictchain.git
   cd predictchain
   ```

2. **Configure Environment Variables:**
   - Create `.env` in the root:
     ```env
     GEMINI_API_KEY=your_gemini_key
     NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id
     ```

3. **Install Dependencies:**
   ```bash
   # Root
   npm install

   # Frontend
   cd frontend && npm install
   
   # Workflow
   cd ../my-workflow && npm install
   ```

## 🛠 Deployment & Usage

### 1. Deploy Smart Contract
```bash
cd contract
forge build
# Deploy to Sepolia (example)
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC --broadcast
```

### 2. Run Frontend
```bash
cd frontend
npm run dev
```

### 3. Simulate CRE Workflow
```bash
cd my-workflow
# Simulate a settlement event
cre workflow simulate --event "SettlementRequested" --params "[MARKET_ID]"
```

## 🛡 Security

- **Verifiable Results**: All match data source URLs are logged in the CRE workflow for transparency.
- **Decentralized Oracle**: Settlement cannot be forged; it must be signed by the authorized CRE workflow.
- **Deadline Enforcement**: Market betting closes strictly before the match begins.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the PredictChain Team.
# cre-sports-prediction
