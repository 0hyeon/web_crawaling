import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";

// 중복 실행 방지를 위한 변수
let isExecuted = false;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response = await (
      await fetch(`http://127.0.0.1/hello`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    console.log(response);

    res.json({
      ok: true,
      ...response, // ...객체 자체가 아니라 객체의 내용을 제공합니다.
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
