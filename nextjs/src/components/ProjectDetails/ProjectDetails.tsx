"use client";

import { useReadCrowdfundingNftGetProject } from "@/lib/contracts";
import { useAccount } from "wagmi";

import ContributionForm from "./ContributionForm";
import FundingProgress from "./FundingProgress";
import WithdrawProject from "./WithdrawProject";

export default function ProjectDetails(props: { id: bigint }) {
  const { address } = useAccount();

  const {
    data: project,
    isPending,
    error,
  } = useReadCrowdfundingNftGetProject({ args: [props.id], account: address });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // TODO: Check if the project exists

  return (
    <div>
      <h2>{project.name}</h2>
      <p>Created by: {project.owner}</p>

      <FundingProgress {...project} />
      <ContributionForm {...project} />
      <WithdrawProject {...project} />
    </div>
  );
}
