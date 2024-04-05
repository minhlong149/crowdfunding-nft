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

  async function handleRelease(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let assetUri = formData.get("assetUri") as string | File;

    if (assetUri instanceof File) {
      assetUri = await uploadFile(assetUri);
    }

    // TODO: Check if the asset URI is a valid IPFS CID

    writeContract({ args: [project.id, assetUri] });

    e.currentTarget.reset();
  }

  async function uploadFile(file: File): Promise<string> {
    // TODO: Send a POST request to the IPFS API to upload the file
    //  The API will return the CID of the uploaded file
    return "bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg";
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
