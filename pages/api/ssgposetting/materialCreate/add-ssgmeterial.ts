import { SSG_DFINARY_TrackingLinkList } from './../../../../node_modules/.prisma/client/index.d';
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from '@libs/server/withSession';

const prisma = new PrismaClient();


async function handler(req: any, res: NextApiResponse<ResponseType>) {
    const {
        body: {구분1,구분2,몰,소재명,매체,채널코드,트래킹링크명,트래킹링크},
        session : {user}
    } = req;
    // console.log("채널코드 : ",채널코드)
    const userfind = await prisma.user.findFirst({
        where: {
          name: user?.id,
        },
        select: {
          id: true,
        },
      });

    const mediafind = await prisma.sSG_PO_Media.findFirst({
        where: {
          media: 매체,
        },
        select: {
          id: true,
        },
      });
    const channelfind = await prisma.sSG_PO_Channel.findFirst({
        where: {
          channel: 채널코드,
        },
        select: {
          id: true,
        },
      });

    const TrackingLinkList = await prisma.sSG_DFINARY_TrackingLinkList.create({
        data: { 
            mall:몰,
            trackingLink: 트래킹링크,
            trackingLinkName:트래킹링크명,
            division_1:구분1,
            division_2: 구분2,
            materialName:소재명,
            channel:{
                connect:{
                    id: channelfind?.id
                }
            },
            media: {
                connect: {
                  id: mediafind?.id,
                },
              },
            user: {
                connect: {
                  id: userfind?.id,
                },
              },
            
        },
    });
    
    res.status(200).json({ ok: true, TrackingLinkList });
}
export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: true })
);