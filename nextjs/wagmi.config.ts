import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/lib/contracts.ts",
  plugins: [
    react(),
    hardhat({
      project: "../hardhat",
      deployments: {
        // Update this to the address of your deployed contract
        CrowdfundingNFT: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
    }),
  ],
});
