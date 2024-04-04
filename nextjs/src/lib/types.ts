export interface ProjectDetails {
  id: bigint;
  name: string;
  fund: bigint;
  goal: bigint;
  owner: `0x${string}`;
  released: boolean;
}
