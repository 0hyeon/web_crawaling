import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";

interface CloudflareResponse {
  result: { ok: boolean; url: string };
  success: boolean;
  errors?: Array<{ message: string }>;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = new FormData();
  formData.append("file", req.body.file);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
        },
        body: formData,
      }
    );

    const jsonData: CloudflareResponse = await response.json();

    console.log("files.ts:", jsonData);

    if (jsonData.success && jsonData.result.ok) {
      res.json({ url: jsonData.result.url });
    } else {
      const errorMessage = jsonData.errors
        ? jsonData.errors[0].message
        : "Image upload failed";
      res.status(500).json({ error: errorMessage });
    }
  } catch (error) {
    console.error("files.ts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withHandler({ methods: ["POST"], handler });
