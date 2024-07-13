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
    {
      name: "The Book Club",
      goal: 8000n,
      owner: m.getAccount(5),
      contribution: [
        { account: m.getAccount(3), value: 3500n },
        { account: m.getAccount(1), value: 3200n },
        { account: m.getAccount(2), value: 2200n },
      ],
      url: "QmTNt651QfMzEkq6rccZFoXjnPDfhp1DsQaZ6wrS7Qo9TZ",
    },
    {
      name: "Cinematic Movie",
      goal: 5000n,
      owner: m.getAccount(3),
      contribution: [
        { account: m.getAccount(1), value: 2500n },
        { account: m.getAccount(4), value: 1200n },
        { account: m.getAccount(2), value: 1200n },
        { account: m.getAccount(5), value: 200n },
      ],
      url: "QmdZW5Qm8A5UR3YJweSLi2DvkgYaaEVgYuKJGg8DRrYw3S",
    },
    {
      name: "DJ Remix Playlist",
      goal: 5000n,
      owner: m.getAccount(4),
      contribution: [
        { account: m.getAccount(3), value: 2500n },
        { account: m.getAccount(4), value: 4200n },
      ],
      url: "QmctqWgKvRknawNqjm3zuS9JVyL6oJAQhLyijMxYd1H2Xy",
    },
    {
      name: "Secret Project",
      goal: 300n,
      owner: m.getAccount(1),
      contribution: [{ account: m.getAccount(2), value: 300n }],
      url: "QmctqWgKvRknawNqjm3zuS9JVyL6oJAQhLyijMxYd1H2Xy",
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
