# Crowdfunding NFT

A decentralized crowdfunding application that allows users to create and fund projects using NFTs on the Ethereum blockchain. Built using `Hardhat Ignition`, `Next.js` & `Wagmi`.

## Getting Started

Hardhat comes built-in with a local Ethereum network node designed for development. Spinning up one with the command:

```bash
npn run node
```

To execute your deployments, you need to use the `ignition deploy` task. In a new terminal, run the following command:

```bash
npn run deploy
```

Finally, run the Next.js development server with the following command, a development server will start at <http://localhost:3000>

```bash
npn run dev
```

Import some accounts from the local node to Metamask and start interacting with the contract.

> If you got the error "Nonce too high" when making transactions (which you most likely will), just reset your account in the Metamask settings. This is caused by the local node not being able to keep track of the nonces.

### Manages ABIs & Generates code with Wagmi CLI

Run the `generate` command to resolve the ABI and generate type-safe React Hooks. Make sure to copy the address of the deployed contracts and paste it to the [`wagmi.config.ts`](nextjs/wagmi.config.ts) file.

```bash
npn run generate
```

> If you make changes to the contracts, you will need to run the `deploy` command again, then run the `generate` command to update the ABIs and the generated code.

### Deploying & Verifying on the Sepolia testnet

The first thing you need is an account with some testnet ETH. Create a new account in Metamask and get some testnet ETH from the [Sepolia faucet](https://faucet.sepolia.io/).

You will also need an API key from [Alchemy](https://www.alchemy.com/) to connect to the network, and a [Etherscan](https://etherscan.io/) API key to verify the contracts.

Once you have all the keys, create a `.env` file with the following content:

```bash
PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"
ALCHEMY_API="YOUR_ALCHEMY_API_KEY"
ETHERSCAN_API="YOUR_ETHERSCAN_API_KEY"
```

Now you can deploy and verify the contracts with the following command:

```bash
npn run deploy:sepolia
```
