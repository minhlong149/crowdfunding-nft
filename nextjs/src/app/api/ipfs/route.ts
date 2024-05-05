import { pinFile } from "@/lib/pinata";
import { NftAssetCid } from "@/lib/types";

export const config = { api: { bodyParser: false } };

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Invalid file" }, { status: 400 });
    }

    const data: NftAssetCid = { cid: await pinFile(file) };
    return Response.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
