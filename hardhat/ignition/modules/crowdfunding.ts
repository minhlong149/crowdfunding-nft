import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CrowdfundingModule", (m) => ({
  crowdfundingModule: m.contract("CrowdfundingNFT", []),
}));
