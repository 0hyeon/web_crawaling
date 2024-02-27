import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function getSSGPOMedia() {
  try {
    const res = await prisma.sSG_PO_Media.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        channel: {
          select: {
            id: true,
            channel: true,
            media: true,
            onOff: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await getSSGPOMedia();
    res.status(200).json({ items: items || [], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
