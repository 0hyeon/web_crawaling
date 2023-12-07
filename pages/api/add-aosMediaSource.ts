import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/clients";
async function handler(req: any, res: NextApiResponse<ResponseType>) {
  const { name: userId, event, sex, type } = req.query;
  const aosMedia = await client.aosMediaSource.create({
    data: {
        mediaSource: 'appier_int',
        jobkoreaBackendData: {
          connect: {
            id: 1
          }
        }
      },
  });
  res.status(200).json({ ok: true, aosMedia });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
