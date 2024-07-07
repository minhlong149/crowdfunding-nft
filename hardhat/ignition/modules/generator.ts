import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import CrowdfundingNFTModule from "./crowdfunding";

export default buildModule("CrowdfundingNFT", (m) => {
  const { crowdfundingNFT } = m.useModule(CrowdfundingNFTModule);

  const projects = [
    {
      name: "Project Ace",
      goal: 10000n,
      owner: m.getAccount(1),
      contribution: [
        { account: m.getAccount(2), value: 4000n },
        { account: m.getAccount(3), value: 6000n },
      ],
      url: "QmfXZZSkiL39MqhY8asMYArKSkGukGoUz2n2mhjzNi69PZ",
    },
    {
      name: "Dyad Campaign",
      goal: 12000n,
      owner: m.getAccount(1),
      contribution: [
        { account: m.getAccount(2), value: 3500n },
        { account: m.getAccount(1), value: 4200n },
      ],
      url: "",
    },
    {
      name: "Nought Operation",
      goal: 5000n,
      owner: m.getAccount(2),
      contribution: [{ account: m.getAccount(1), value: 8000n }],
      url: "",
    },
  ];

  projects.forEach((project, projectIndex) => {
    const announceProject = m.call(
      crowdfundingNFT,
      "announceProject",
      [project.name, project.goal],
      {
        from: project.owner,
        id: `AnnounceProject_${projectIndex}`,
      },
    );

    const contributeToProject = project.contribution.map(
      (contribution, contributionIndex) =>
        m.call(crowdfundingNFT, "contributeToProject", [projectIndex], {
          from: contribution.account,
          value: contribution.value,
          after: [announceProject],
          id: `ContributeToProject_${projectIndex}_${contributionIndex}`,
        }),
    );

    const totalContribution = project.contribution.reduce(
      (totalContribution, { value }) => totalContribution + value,
      0n,
    );

    if (totalContribution >= project.goal && project.url !== "") {
      m.call(crowdfundingNFT, "releaseProject", [projectIndex, project.url], {
        from: project.owner,
        after: contributeToProject,
        id: `ReleaseProject_${projectIndex}`,
      });
    }
  });

  return { crowdfundingNFT };
});
