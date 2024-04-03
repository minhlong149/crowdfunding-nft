"use client";

import { ProjectContext } from "@/lib/context";
import { useContext } from "react";
import { useAccount } from "wagmi";

export default function WithdrawProject() {
  const { project } = useContext(ProjectContext);
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <></>;
  }

  if (project.released) {
    return <></>;
  }

  function handleWithdraw() {
    // TODO: Allow contributor to withdraw their funds
  }

  // TODO: Check if the user has contributed to the project
  // and display the amount they have contributed
  return (
    <div>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}
