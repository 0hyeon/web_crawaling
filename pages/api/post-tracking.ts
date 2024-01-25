import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/clients";
import crypto from "crypto";
async function handler(req: any, res: NextApiResponse<ResponseType>) {
  function hashWithSalt(text: string, salt: string) {
    const sha256Hash = crypto.createHash("sha256");
    sha256Hash.update(salt);
    sha256Hash.update(text);
    return sha256Hash.digest("hex");
  }
  const salt = "greenbricksHashedPassword"; //
  // name: 김영현
  // event: testEvent
  // sex: male
  // type: productData3
  const { name: userId, event, sex, type } = req.query;
  const hashedValue = hashWithSalt(userId, salt);

  const Tracking = await client.tracking.create({
    data: {
      hashedId: hashedValue,
      originId: userId,
      eventName: event,
      sex: sex,
      type: type,
    },
  });
  res.status(200).json({ ok: true, Tracking });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
