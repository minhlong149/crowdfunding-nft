"use client";

import { useAccount } from "wagmi";
import {
  useReadCrowdfundingNftGetContributedProjects,
  useWriteCrowdfundingNftWithdrawFromProject,
} from "@/lib/contracts";

export default function ContributedProjects() {
  const { address } = useAccount();
  const { data, error, isPending } =
    useReadCrowdfundingNftGetContributedProjects({ account: address });
  const { writeContract } = useWriteCrowdfundingNftWithdrawFromProject();

  function handleFundsWithdrawal(projectId: bigint) {
    writeContract({ args: [projectId] });
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <hgroup>
        <h2>Contributed Projects</h2>
        <p>Projects you've contributed to</p>
      </hgroup>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Contribution</th>
            <th scope="col">Funded</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index}>
              <th>{project.name}</th>
              <th>{project.owner}</th>
              <th>{project.contributionAmount.toString()}</th>
              <th>
                {project.fund.toString()}/{project.goal.toString()}
              </th>
              <th>
                <button
                  onClick={() => handleFundsWithdrawal(project.id)}
                  disabled={project.released}
                >
                  Withdraw
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
