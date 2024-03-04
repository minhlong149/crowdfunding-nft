# Crowdfunding NFT

## Getting Started

Hardhat comes built-in with a local Ethereum network node designed for development. Spinning up one with the command:

```bash
npn run node
```

To execute your deployments, you need to use the `ignition deploy` task. In a new terminal, run the following command:

```bash
npn run deploy
```

## Deploying & Verifying on the Sepolia testnet

The first thing you need is an account with some testnet ETH. Create a new account in Metamask and get some testnet ETH from the [Sepolia faucet](https://faucet.sepolia.io/) You will also need an API key from [Alchemy](https://www.alchemy.com/) to connect to the network, and a [Etherscan](https://etherscan.io/) API key to verify the contracts.

Once you have all the keys, create a `.env` file in the root of the project with the following content:

```bash
PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"
ALCHEMY_API="YOUR_ALCHEMY_API_KEY"
ETHERSCAN_API="YOUR_ETHERSCAN_API_KEY"
```

Now you can deploy and verify the contracts with the following command:

```bash
npn run deploy:sepolia
```
