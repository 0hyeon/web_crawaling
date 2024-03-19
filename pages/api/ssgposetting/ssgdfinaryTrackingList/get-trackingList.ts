import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma, SSG_DFINARY } from "@prisma/client";
const prisma = new PrismaClient();

async function getTrackingData() {
  try {
    const items = await prisma.sSG_DFINARY_TrackingLinkList.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        channel: true,
        media: true,
      },
    });

    return items;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await getTrackingData();
    res.status(200).json({ items: items || [], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
