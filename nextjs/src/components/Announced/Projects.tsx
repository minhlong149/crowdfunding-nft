"use client";

import {
  useReadCrowdfundingNftGetProjects,
  useWriteCrowdfundingNftReleaseProject,
} from "@/lib/contracts";
import { useAccount } from "wagmi";

export default function AnnouncedProjects() {
  const { address } = useAccount();
  const { data, error, isPending } = useReadCrowdfundingNftGetProjects();
  const { writeContract } = useWriteCrowdfundingNftReleaseProject();

  function handleReleaseProject(projectID: bigint) {
    writeContract({ args: [projectID, "hehehe"] });
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
        <h3>Announced projects</h3>
        <p>Projects you've created</p>
      </hgroup>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Funded</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
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
                  <button
                    onClick={() => handleReleaseProject(project.id)}
                    disabled={project.released}
                  >
                    Release
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
