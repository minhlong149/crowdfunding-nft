"use client";

import { ProjectContext } from "@/lib/context";
import { useWriteCrowdfundingNftReleaseProject } from "@/lib/contracts";
import { NftAssetCid } from "@/lib/types";
import { isValidCid } from "@/lib/utils";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftAsset from "./NftAsset";

export default function ReleaseProject() {
  const { project, reloadProject } = useContext(ProjectContext);
  const { address } = useAccount();
  const { writeContract, data, error, isPending } =
    useWriteCrowdfundingNftReleaseProject();

  const [useFileUpload, setUseFileUpload] = useState<boolean>(false);
  const [cidPath, setCidPath] = useState<string | null>(null);

  useEffect(() => {
    if (!error) {
      reloadProject();
    }
  }, [data]);

  if (project.released) {
    return <NftAsset cid={project.nftUri} />;
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

    writeContract({ args: [project.id, assetUri] });

    setCidPath(null);
    e.currentTarget?.reset();
  }

  async function uploadFile(file: File): Promise<string> {
    try {
      const fileToUpload = new FormData();
      fileToUpload.set("file", file);
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: fileToUpload,
      });
      if (!response.ok) {
        throw new Error();
      }
      const data: NftAssetCid = await response.json();
      return data.cid;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  const cidPathIsInvalid =
    cidPath === null || useFileUpload
      ? undefined // Don't show error if file upload is used
      : !isValidCid(cidPath);

  const updatePathIfInputIsText = (e: FormEvent<HTMLInputElement>) => {
    if (!useFileUpload) {
      setCidPath(e.currentTarget.value);
    }
  };

  return (
    <form onSubmit={handleRelease}>
      <h4>Release project</h4>
      <fieldset role="group">
        <input
          type={useFileUpload ? "file" : "text"}
          aria-invalid={cidPathIsInvalid}
          onChange={updatePathIfInputIsText}
          name="assetUri"
          placeholder="CID of the project's asset"
          required
        />

        <input
          type="submit"
          value="Release"
          disabled={isPending || cidPathIsInvalid}
        />
      </fieldset>

      <fieldset>
        <label>
          <input
            type="checkbox"
            role="switch"
            checked={useFileUpload}
            onChange={() => setUseFileUpload(!useFileUpload)}
            disabled={isPending}
          />
          I want to upload a file
        </label>
      </fieldset>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
