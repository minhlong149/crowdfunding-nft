import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CrowdfundingModule", (m) => ({
  crowdfundingNFT: m.contract("CrowdfundingNFT", [], { id: "DeployContract" }),
}));
