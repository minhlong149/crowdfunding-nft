const BASE_URL = "https://api.pinata.cloud";

type PinFileResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  IsDuplicate: boolean;
};

export async function pinFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify({ name: file.name }));

  const response = await fetch(`${BASE_URL}/pinning/pinFileToIPFS`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
      ContentType: "multipart/form-data",
    },
    body: formData,
  });

  const { IpfsHash } = (await response.json()) as PinFileResponse;
  return IpfsHash;
}
