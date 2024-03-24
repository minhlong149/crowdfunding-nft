# Crowdfunding NFT

A decentralized crowdfunding application that allows users to create and fund projects using NFTs on the Ethereum blockchain. Built using [`Hardhat Ignition`](https://hardhat.org/ignition), `Next.js` & [`Wagmi`](https://wagmi.sh/react).

## Getting Started

Hardhat comes built-in with a local Ethereum network node designed for development. Spinning up one with the command:

```bash
npn run node
```

To execute your deployments, you need to use the `ignition deploy` task. In a new terminal, run the following command to deploy the contracts:

```bash
npn run deploy
```

Finally, run the Next.js development server with the following command, a development server will start at <http://localhost:3000>

```bash
npn run dev
```

Import some accounts from the local node to Metamask and start interacting with the contract.

### Manages ABIs & Generates code with Wagmi CLI

After deploying the contracts, the ABIs will be saved in the `hardhat/artifacts` folder. Run the `generate` command to resolve these ABIs and generate type-safe React Hooks.

```bash
npn run generate
```

The generated code will be saved in the `nextjs/src/contracts.ts` file. Check out the configuration options at [`wagmi.config.ts`](nextjs/wagmi.config.ts).

> [!CAUTION]
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

> [!IMPORTANT]
> Make sure to copy the address of the deployed contracts to the [`wagmi.config.ts`](nextjs/wagmi.config.ts) file, then run the `generate` command to update the contract addresses.

## Known Issues

- `Nonce too high` [Reset your Metamask Account](https://support.metamask.io/hc/en-us/articles/360015488891-How-to-clear-your-account-activity-reset-account)
- `ENOWORKSPACES` Fix this [issue](https://github.com/vercel/next.js/issues/47121#issuecomment-1499044345) by disable [Next Telemetry](https://nextjs.org/telemetry)

## References

- [ERC1155 - OpenZeppelin](https://docs.openzeppelin.com/contracts/erc1155)
- [Hardhat Ignition Modules](https://hardhat.org/ignition/docs/guides/creating-modules)
- [Manage ABIs - Wagmi CLI](https://wagmi.sh/cli)
- [Read from Contract - Wagmi](https://wagmi.sh/react/guides/read-from-contract)
- [Write to Contract - Wagmi](https://wagmi.sh/react/guides/write-to-contract)
