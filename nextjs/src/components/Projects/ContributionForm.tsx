"use client";

import { FormEvent } from "react";
import { useWriteCrowdfundingNftContributeToProject } from "@/lib/contracts";

export default function ProjectContributionForm(props: { projectId: bigint }) {
  const { error, isPending, writeContract } =
    useWriteCrowdfundingNftContributeToProject();

  function addContribution(e: FormEvent<HTMLFormElement>) {
    // TODO: Allow user to contribute to a project
    e.preventDefault();
    writeContract({ args: [props.projectId] });
  }

  return (
    <form onSubmit={addContribution}>
      <input type="number" />
      <button type="submit">Contribute</button>
      <div>
        <button disabled={isPending} type="submit">
          {isPending ? "Contributing..." : "Done"}
        </button>

        {error && <span>Error: {error.message}</span>}
      </div>
    </form>
  );
}
