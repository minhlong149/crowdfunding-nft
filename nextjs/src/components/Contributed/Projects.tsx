"use client";

import { useAccount } from "wagmi";
import { useReadCrowdfundingNftGetContributedProjects } from "@/lib/contracts";

export default function ContributedProjects() {
  const { address } = useAccount();
  const { data, error, isPending } =
    useReadCrowdfundingNftGetContributedProjects({ account: address });

  function handleFundsWithdrawal() {
    // TODO: Allow contributor to withdraw their funds
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Contributed Projects</h2>
      <p>Projects you've contributed to</p>
      <table>
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
                onClick={handleFundsWithdrawal}
                disabled={project.released}
              >
                Withdraw
              </button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}
