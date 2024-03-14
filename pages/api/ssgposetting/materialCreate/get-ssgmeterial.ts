import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
const prisma = new PrismaClient();


async function handler(req: any, res: NextApiResponse<ResponseType>) {
    const { media } = req.query;
    const result = await prisma.sSG_PO_Media.findMany({
        orderBy: {
        createdAt: "desc",
        },
        where:{
            media: media
        },
        include: {
            SSG_PO_Channel: {
              select: {
                id: true,
                channel: true,
                media: true,
                onOff: true,
                SSG_DFINARY_TrackingLinkList : {
                  select: {
                    id: true,
                    mall: true,
                    division_1: true,
                    division_2: true,
                    materialName: true,
                    channelId: true,
                    channel:true,
                    mediaId: true,
                    media:true
                  }
                }  
              },
            },
          },
    });
    res.status(200).json({ ok: true, result });
}
export default withHandler({ methods: ["GET"], handler, isPrivate: false });