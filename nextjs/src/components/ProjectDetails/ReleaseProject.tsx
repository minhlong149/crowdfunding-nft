"use client";

import { ProjectContext } from "@/lib/context";
import { useWriteCrowdfundingNftReleaseProject } from "@/lib/contracts";
import { FormEvent, useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function ReleaseProject() {
  const { project, reloadProject } = useContext(ProjectContext);
  const { address } = useAccount();
  const { writeContract, data, error, isPending } =
    useWriteCrowdfundingNftReleaseProject();

  useEffect(() => {
    if (!error) {
      reloadProject();
    }
  }, [data]);

  if (project.released) {
    // TODO: Render the NFT based on its type (image, video, etc.)
    return <p>Project released!</p>;
  }

  if (address !== project.owner) {
    return <></>;
  }

  if (project.fund < project.goal) {
    return <></>;
  }

  function handleRelease(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const assetUri = formData.get("assetUri") as string;

    writeContract({ args: [project.id, assetUri] });

    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleRelease}>
      <fieldset role="group">
        <input
          name="assetUri"
          placeholder="URI of the project's asset"
          required
        />
        <input type="submit" value="Release" disabled={isPending} />
      </fieldset>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
