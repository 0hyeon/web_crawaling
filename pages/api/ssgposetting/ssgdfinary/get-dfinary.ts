import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma, SSG_DFINARY } from "@prisma/client";
const prisma = new PrismaClient();

interface ISSGDfn {
  category: string;
  select: {
    id: boolean;
    daily: boolean;
    tracker: boolean;
    platform: boolean;
    uniqueView?: boolean;
    sumValue?: boolean;
    pageView?: boolean;
    clickCount?: boolean;
    newInstallClick?: boolean;
    reInstallClick?: boolean;
    reOpen?: boolean;
    eventName?: boolean;
    mall?: boolean;
    category?: boolean;
  };
}
async function getDfnData({
  startday,
  lastday,
}: {
  startday?: string | null;
  lastday?: string | null;
}) {
  try {
    const whereCondition: Prisma.SSG_DFINARYWhereInput = {};

    if (startday && lastday === null) {
      const startDate = new Date(startday);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      const startDateString = startDate.toISOString().slice(0, 10);
      whereCondition.OR = [{ daily: startDateString }];
    }
    if (startday !== null && lastday !== null) {
      if (startday !== undefined && lastday !== undefined) {
        const startDate = new Date(startday);
        const lastDate = new Date(lastday);
        const startDateString = startDate.toISOString().slice(0, 10);
        const endDateString = lastDate.toISOString().slice(0, 10);
        whereCondition.OR = [
          { daily: { gte: startDateString, lte: endDateString } },
        ];
      }
    }
    const uniqueItems = await prisma.sSG_DFINARY.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: whereCondition,
    });
    return uniqueItems;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { startday, lastday } = req.query;
  try {
    const items = await getDfnData({
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
    });
    res.status(200).json({ items: items || [], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
