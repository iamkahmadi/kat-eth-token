# KAT Token DApp

A simple ERC20 token called **KAT** deployed on a local Hardhat network, with a React DApp frontend for transferring tokens. This project demonstrates how to build a token on Ethereum, deploy it locally, and interact with it via a web-based DApp using MetaMask.

## Features
- **ERC20 Token**: A basic ERC20 token `KAT` with minting functionality.
- **Hardhat Network**: Deployed locally on a Hardhat Ethereum node for testing.
- **React DApp**: A frontend built with React to interact with the smart contract, check balance, and transfer tokens.
- **MetaMask Integration**: Allows users to connect their MetaMask wallet for transactions.

## Prerequisites

- **Node.js** (Preferably 18.x or newer)
- **MetaMask** (For interacting with the Ethereum network)
- **npm** (Package manager)

## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/iamkahmadi/kat-eth-token.git
cd kat-eth-token
```

### 2. Set Up the Backend (Hardhat)

#### a. Install Backend Dependencies
Install the necessary dependencies:

```bash
npm install
```

#### b. Start the Hardhat Node
Start the local Hardhat network:

```bash
npx hardhat node
```

This will start the Hardhat network at `http://localhost:8545`. Keep this terminal window open.

#### c. Deploy the Contract
In a new terminal window (keep the Hardhat node running), run the deployment script to deploy the token contract to the local Hardhat network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will deploy the `KATToken` contract and output the contract's address.

### 3. Set Up the Frontend (React DApp)

#### a. Install Frontend Dependencies
Navigate to the `kat-dapp` folder and install the necessary frontend dependencies:

```bash
cd kat-dapp
npm install
```

#### b. Update Contract Address
In the `src/App.js` file, replace the placeholder `YOUR_DEPLOYED_CONTRACT_ADDRESS` with the actual address of the deployed contract from the previous step.

```javascript
const tokenAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed contract address
```

#### c. Install Dependencies
Install the necessary dependencies:

#### d. Update abi.json with new abi of deployed contract

```bash
npm install
```

#### e. Start the React Development Server
Run the React app on your local development server:

```bash
npm start
```

This will start the React app at `http://localhost:3000`.

### 4. Interact with the DApp

1. **MetaMask**: Open MetaMask, set the network to **localhost** (`http://localhost:8545`), and connect to your MetaMask wallet.
2. **Transfer Tokens**: You can now interact with the KAT token contract through the DApp by entering the recipient address and amount to transfer tokens.
