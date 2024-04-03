"use client";

import { ProjectContext } from "@/lib/context";
import { useContext } from "react";
import { useAccount } from "wagmi";

export default function ReleaseProject() {
  const { project } = useContext(ProjectContext);
  const { address } = useAccount();

  if (project.released) {
    // TODO: Render the NFT based on its type (image, video, etc.)
  }

  if (address !== project.owner) {
    return <></>;
  }

  function handleRelease() {
    // TODO: Allow owner to release their projects
  }

  return (
    <div>
      <button onClick={handleRelease}>Release project</button>
    </div>
  );
}
