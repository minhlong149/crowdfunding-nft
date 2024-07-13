"use client";

import { FormEvent } from "react";
import { useWriteCrowdfundingNftContributeToProject } from "@/lib/contracts";

interface ProjectContributionFormProps {
  id: bigint;
  released: boolean;
}

export default function ProjectContributionForm(
  props: ProjectContributionFormProps,
) {
  const { error, isPending, writeContract } =
    useWriteCrowdfundingNftContributeToProject();

  function addContribution(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contribution = formData.get("contribution") as string;

    writeContract({ args: [props.id], value: BigInt(contribution) });
  }

  return (
    <form onSubmit={addContribution}>
      <fieldset role="group" disabled={props.released}>
        <input type="number" name="contribution" required min="1" />
        <button type="submit">Contribute</button>
      </fieldset>

      {error && <span>Error: {error.message}</span>}
    </form>
  );
}
