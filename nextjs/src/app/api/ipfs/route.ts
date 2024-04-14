import { NftAsset } from "@/lib/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Replace this with the CID of the uploaded file
  const cid = "bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg";
  return NextResponse.json<NftAsset>({ cid }, { status: 201 });
}
