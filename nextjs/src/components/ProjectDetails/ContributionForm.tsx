"use client";

import { FormEvent } from "react";
import { useAccount } from "wagmi";

export default function ContributionForm(project: {
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

  async function handleFund(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Allow user to contribute to a project
  }

  return (
    <form onSubmit={handleFund}>
      <h4>Fund this project!</h4>
      <fieldset role="group">
        <input
          type="number"
          name="contribution"
          placeholder="Contribute amount"
        />
        <input type="submit" value="Fund"/>
      </fieldset>
    </form>
  );
}
