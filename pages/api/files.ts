import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      // `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
        },
      }
    )
  ).json();
  console.log("files.ts : ", response);
  res.json({
    ok: true,
    ...response.result, // ...객체 자체가 아니라 객체의 내용을 제공합니다.
  });
}
//유저는 우리에게 url 을 원할거고, cloud flare는 url을 요청함
export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: false,
});
