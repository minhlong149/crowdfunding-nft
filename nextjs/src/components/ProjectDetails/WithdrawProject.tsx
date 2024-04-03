"use client";

import { useAccount } from "wagmi";

export default function WithdrawProject(project: {
  id: bigint;
  released: boolean;
}) {
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
