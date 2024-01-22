import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/clients";
import crypto from "crypto";

import { withApiSession, withSsrSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  function hashWithSalt(text: string, salt: string) {
    const sha256Hash = crypto.createHash("sha256");
    sha256Hash.update(salt);
    sha256Hash.update(text);
    return sha256Hash.digest("hex");
  }
  const salt = "greenbricksHashedPassword";

  const { name: userId, pw } = req.body;

  const hashedValue = hashWithSalt(userId, salt);

  req.session.user = {
    id: userId,
  };
  const profile = await client.user.findFirst({
    where: { name: userId },
  });
  console.log("profile : ", profile);
  console.log("userId : ", userId);

  if (profile?.name === userId) {
    const Tracking = await client.tracking.create({
      data: {
        hashedId: hashedValue,
        originId: userId,
        eventName: "LoginEvent",
      },
    });
    await req.session.save(); //쿠키저장
    res.json({ ok: true, Tracking, profile });
  } else {
    res.json({ ok: false, errors: { message: "존재하지 않는계정입니다" } });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
