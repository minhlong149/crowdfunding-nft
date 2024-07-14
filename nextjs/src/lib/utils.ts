import { cid, cidPath } from "is-ipfs";

export function isValidCid(path: string) {
  return cid(path) || cidPath(path);
}

export function convertToGateway(cid: string) {
  const {
    NEXT_PUBLIC_PINATA_GATEWAY_URL: pinataUrl,
    NEXT_PUBLIC_PINATA_GATEWAY_TOKEN: pinataToken,
  } = process.env;

  if (pinataUrl && pinataToken) {
    return `${pinataUrl}/ipfs/${cid}?pinataGatewayToken=${pinataToken}`;
  }

  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
