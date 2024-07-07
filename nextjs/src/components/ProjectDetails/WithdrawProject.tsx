"use client";

import { ProjectContext } from "@/lib/context";
import { useWriteCrowdfundingNftWithdrawFromProject } from "@/lib/contracts";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function WithdrawProject() {
  const { project, reloadProject } = useContext(ProjectContext);
  const { isConnected } = useAccount();
  const { writeContract, data, error, isPending } =
    useWriteCrowdfundingNftWithdrawFromProject();

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

  function handleWithdraw() {
    writeContract({ args: [project.id] });
  }

  // TODO: Check if the user has contributed to the project
  // and display the amount they have contributed
  return (
    <div>
      <p>Your contribution: {project.contributionAmount.toLocaleString()}</p>
      <button
        onClick={handleWithdraw}
        disabled={isPending}
        className="outline contrast"
      >
        Withdraw
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
