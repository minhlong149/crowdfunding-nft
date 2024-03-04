import type { HardhatUserConfig } from "hardhat/types";

import "@nomicfoundation/hardhat-ignition-viem";
import "dotenv/config";

const {
  PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Replace with your Metamask private key
  ALCHEMY_API_KEY = "YOUR_ALCHEMY_API_KEY",
  ETHERSCAN_API_KEY = "YOUR_ETHERSCAN_API_KEY",
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
