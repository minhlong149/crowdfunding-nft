"use client";

import ProjectContributionForm from "@/components/Projects/ContributionForm";
import { useReadCrowdfundingNftGetProjects } from "@/lib/contracts";
import Link from "next/link";

export default function Projects() {
  const { data, error, isPending } = useReadCrowdfundingNftGetProjects();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>All projects</h2>
      <table>
        {data.map((project) => (
          <tr key={project.id}>
            <th>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </th>
            <th>{project.owner}</th>
            <th>
              {project.fund.toString()}/{project.goal.toString()}
            </th>
            <th>
              <ProjectContributionForm projectId={project.id} />
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}
