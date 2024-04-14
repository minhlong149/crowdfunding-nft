"use client";

import { FormEvent } from "react";
import { useWriteCrowdfundingNftContributeToProject } from "@/lib/contracts";

export default function ProjectContributionForm(props: { projectId: bigint }) {
  const { error, isPending, writeContract } =
    useWriteCrowdfundingNftContributeToProject();

  function addContribution(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contribution = formData.get("contribution") as string;

    writeContract({ args: [props.projectId], value: BigInt(contribution) });
  }

  return (
    <form onSubmit={addContribution}>
      <input type="number" name={"contribution"} />
      <button type="submit">Contribute</button>

      {error && <span>Error: {error.message}</span>}
    </form>
  );
}
