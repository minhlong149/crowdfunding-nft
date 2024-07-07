"use client";

import { NftAssetCid } from "@/lib/types";
import { convertToGateway } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function NftAsset({ cid }: NftAssetCid) {
  const url = convertToGateway(cid);

  const { data, status } = useQuery({
    queryKey: ["nftFileType"],
    queryFn: () => fetch(url),
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error" || !data.ok) {
    return <span>Failed to get the content of the file</span>;
  }

  const DefaultFileDisplay = () => (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {cid}
    </a>
  );

  const fileType = data.headers.get("content-type") || "";

  if (fileType.startsWith("image/")) {
    return <img src={url} alt="NFT Asset" />;
  }

  if (fileType.startsWith("video/")) {
    return (
      <video controls>
        <source src={url} type={fileType} />
        <DefaultFileDisplay />
      </video>
    );
  }

  if (fileType.startsWith("audio/")) {
    return (
      <audio controls>
        <source src={url} type={fileType} />
        <DefaultFileDisplay />
      </audio>
    );
  }

  if (fileType.startsWith("application/")) {
    return (
      <object data={url} type={fileType}>
        <DefaultFileDisplay />
      </object>
    );
  }

  return <DefaultFileDisplay />;
}
