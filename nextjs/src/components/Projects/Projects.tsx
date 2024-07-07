"use client";

import ProjectContributionForm from "@/components/Projects/ContributionForm";
import { useReadCrowdfundingNftGetProjects } from "@/lib/contracts";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Projects() {
  const { data, error, isPending } = useReadCrowdfundingNftGetProjects();
  const { isConnected } = useAccount();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Fund/Goal</th>
          {isConnected ? <th>Contribute</th> : <></>}
        </tr>
      </thead>
      <tbody>
        {data.map((project) => (
          <tr key={project.id}>
            <th>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </th>
            <th>{project.owner}</th>
            <th>
              {project.fund.toString()}/{project.goal.toString()}
            </th>
            {isConnected ? (
              <th>
                <ProjectContributionForm projectId={project.id} />
              </th>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
