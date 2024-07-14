"use client";

import { useReadCrowdfundingNftGetProjects } from "@/lib/contracts";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function AnnouncedProjects() {
  const { address } = useAccount();
  const { data, error, isPending } = useReadCrowdfundingNftGetProjects();

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
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((campaign) => campaign.owner === address)
            .map((project) => (
              <tr key={project.id}>
                <th>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </th>{" "}
                <th>{project.owner}</th>
                <th>
                  {project.fund.toString()}/{project.goal.toString()}
                </th>
                <th>{project.released ? "Closed" : "Open"}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
