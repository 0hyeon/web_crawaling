import { SSG_DFINARY_TrackingLinkList } from './../../../../node_modules/.prisma/client/index.d';
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
const prisma = new PrismaClient();


async function handler(req: any, res: NextApiResponse<ResponseType>) {
    const { media } = req.query;
    console.log('media :',media )
    const result = await prisma.sSG_DFINARY_TrackingLinkList.create({
        data: { media },
    });
    
    res.status(200).json({ ok: true, result });
}
export default withHandler({ methods: ["GET"], handler, isPrivate: false });