"use client";

import { useReadCrowdfundingNftGetProjects } from "@/lib/contracts";
import { useAccount } from "wagmi";

export default function AnnouncedProjects() {
  const { address } = useAccount();
  const { data, error, isPending } = useReadCrowdfundingNftGetProjects();

  function releaseProject() {
    // TODO: Allow owner to release their projects
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Announced Projects</h2>
      <p>Projects you've created</p>
      <table>
        {data
          .filter((campaign) => campaign.owner === address)
          .map((project) => (
            <tr key={project.id}>
              <th>{project.name}</th>
              <th>{project.owner}</th>
              <th>
                {project.fund.toString()}/{project.goal.toString()}
              </th>
              <th>
                <button onClick={releaseProject} disabled={project.released}>
                  Release
                </button>
              </th>
            </tr>
          ))}
      </table>
    </div>
  );
}
