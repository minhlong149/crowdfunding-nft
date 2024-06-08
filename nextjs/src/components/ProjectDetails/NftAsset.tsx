"use client";

import { useEffect, useState } from "react";
import { NftAssetCid } from "@/lib/types";

type NftAssetPropS = {
  asset: NftAssetCid;
};

export default function NftAsset({ asset }: NftAssetPropS) {
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    fetch(asset.cid)
      .then((response) => response.headers.get("content-type"))
      .then((type) => setFileType(type ?? ""));
  }, [asset]);

  if (fileType.startsWith("image/")) {
    return <img src={asset.cid} alt="NFT Asset" />;
  }

  if (fileType.startsWith("video/")) {
    return (
      <video controls>
        <source src={asset.cid} type={fileType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (fileType.startsWith("audio/")) {
    return (
      <audio controls>
        <source src={asset.cid} type={fileType} />
        Trình duyệt của bạn không hỗ trợ thẻ audio.
      </audio>
    );
  }

  if (fileType === "application/pdf") {
    return (
      <object
        data={asset.cid}
        type="application/pdf"
        width="100%"
        height="600px"
      >
        Trình duyệt của bạn không hỗ trợ thẻ object.
      </object>
    );
  }

  // Add more conditions here for other file types

  return <div>Unsupported file type: {fileType}</div>;
}
