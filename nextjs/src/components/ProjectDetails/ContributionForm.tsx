"use client";

import { ProjectContext } from "@/lib/context";
import { useWriteCrowdfundingNftContributeToProject } from "@/lib/contracts";
import { FormEvent, useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function ContributionForm() {
  const { project, reloadProject } = useContext(ProjectContext);
  const { isConnected } = useAccount();
  const { writeContract, data, error, isPending } =
    useWriteCrowdfundingNftContributeToProject();

  useEffect(() => {
    if (!error) {
      reloadProject();
    }
  }, [data]);

  if (!isConnected) {
    return <></>;
  }

  if (project.released) {
    return <></>;
  }

  function handleFund(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contribution = formData.get("contribution") as string;

    writeContract({
      args: [project.id],
      value: BigInt(contribution),
    });

    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleFund}>
      <h4>Fund this project!</h4>
      <fieldset role="group">
        <input
          type="number"
          name="contribution"
          placeholder="Contribute amount"
          required
          min="1"
        />
        <input type="submit" value="Fund" disabled={isPending} />
      </fieldset>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
