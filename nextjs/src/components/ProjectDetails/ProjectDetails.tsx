"use client";

import { ProjectContext, ProjectContextType } from "@/lib/context";
import { useReadCrowdfundingNftGetProject } from "@/lib/contracts";
import { useAccount } from "wagmi";

import ContributionForm from "./ContributionForm";
import FundingProgress from "./FundingProgress";
import ReleaseProject from "./ReleaseProject";
import WithdrawProject from "./WithdrawProject";

export default function ProjectDetails(props: { id: bigint }) {
  const { address } = useAccount();
  const { data, isPending, error, refetch } = useReadCrowdfundingNftGetProject({
    args: [props.id],
    account: address,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const projectContextValue: ProjectContextType = {
    project: data,
    reloadProject: refetch,
  };

  // TODO: Check if the project exists

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Created by: {data.owner}</p>

      <ProjectContext.Provider value={projectContextValue}>
        <FundingProgress/>
        <ContributionForm/>
        <WithdrawProject/>
        <ReleaseProject/>
      </ProjectContext.Provider>
    </div>
  );
}
