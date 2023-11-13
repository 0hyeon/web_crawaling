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
  const salt = "greenbricksHashedPassword"; //

  const { name: userId, pw } = req.body;

  const hashedValue = hashWithSalt(userId, salt);

  const Tracking = await client.tracking.create({
    data: {
      hashedId: hashedValue,
      originId: userId,
      eventName: "LoginEvent",
    },
  });
  req.session.user = {
    id: userId,
  };
  await req.session.save(); //쿠키저장
  console.log("req.session : ",req.session);//{ user: { id: 'admin' } }
  res.json({ ok: true, Tracking });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
