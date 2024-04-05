export interface ProjectDetails {
  id: bigint;
  contributionId: bigint;
  contributionAmount: bigint;
  nftId: bigint;
  nftUri: string;
  ownsNft: boolean;
  name: string;
  fund: bigint;
  goal: bigint;
  owner: `0x${string}`;
  released: boolean;
}

export interface NftAsset {
  cid: string;
}
