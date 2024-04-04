"use client";

import { FormEvent } from "react";
import { useWriteCrowdfundingNftContributeToProject } from "@/lib/contracts";

export default function ProjectContributionForm(props: { projectId: bigint }) {
  const { error, isPending, writeContract } =
    useWriteCrowdfundingNftContributeToProject();

  function addContribution(e: FormEvent<HTMLFormElement>) {
    // TODO: Allow user to contribute to a project
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contribution = formData.get("contribution") as string;

    writeContract({ args: [props.projectId], value: BigInt(contribution) });
  }

  return (
    <form onSubmit={addContribution}>
      <input type="number" />
      <button type="submit">Contribute</button>
      <div>
        <label>{isPending ? "Contributing..." : "Done"}</label>

        {error && <span>Error: {error.message}</span>}
      </div>
    </form>
  );
}
