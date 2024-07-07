"use client";

import { useWriteCrowdfundingNftAnnounceProject } from "@/lib/contracts";
import { FormEvent } from "react";

export default function NewProjectForm() {
  const { error, isPending, writeContract } =
    useWriteCrowdfundingNftAnnounceProject();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("projectName") as string;
    const goal = formData.get("projectGoal") as string;

    writeContract({ args: [name, BigInt(goal)] });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new project</h3>

      <div className="grid">
        <div>
          <label htmlFor="projectName">Name: </label>
          <input name="projectName" required type="text" />
        </div>
        <div>
          <label htmlFor="projectGoal">Goal: </label>
          <fieldset role="group">
            <input name="projectGoal" required type="number" />
            <button disabled={isPending} type="submit">
              {isPending ? "Confirming..." : "Create"}
            </button>
          </fieldset>
        </div>
      </div>

      <div>{error && <span>Error: {error.message}</span>}</div>
    </form>
  );
}
