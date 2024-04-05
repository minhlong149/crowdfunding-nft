"use client";

import { ProjectContext } from "@/lib/context";
import { useWriteCrowdfundingNftReleaseProject } from "@/lib/contracts";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftAsset from "./NftAsset";

export default function ReleaseProject() {
  const { project, reloadProject } = useContext(ProjectContext);
  const { address } = useAccount();
  const { writeContract, data, error, isPending } =
    useWriteCrowdfundingNftReleaseProject();

  const [useFileUpload, setUseFileUpload] = useState(false);

  useEffect(() => {
    if (!error) {
      reloadProject();
    }
  }, [data]);

  if (project.released) {
    return <NftAsset />;
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
      <h4>Release project</h4>
      <fieldset role="group">
        <input
          type={useFileUpload ? "file" : "text"}
          name="assetUri"
          placeholder="URI of the project's asset"
          required
        />
        <input type="submit" value="Release" disabled={isPending} />
      </fieldset>

      <fieldset>
        <label>
          <input
            type="checkbox"
            role="switch"
            checked={useFileUpload}
            onChange={() => setUseFileUpload(!useFileUpload)}
          />
          I want to upload a file
        </label>
      </fieldset>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
