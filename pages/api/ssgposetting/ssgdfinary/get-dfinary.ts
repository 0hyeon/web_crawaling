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
async function getDfnData() {
  try {
    // const queriesEvent: ISSGDfn[] = [
    //   {
    //     category: "evnets_reportId",
    //     select: {
    //       id: true,
    //       daily: true,
    //       tracker: true,
    //       platform: true,

    //       uniqueView: true,
    //       sumValue: true,
    //       pageView: true,

    //       eventName: true,
    //       mall: true,
    //       category: true,
    //     },
    //   },
    //   {
    //     category: "membership_reportId",
    //     select: {
    //       id: true,
    //       daily: true,
    //       tracker: true,
    //       platform: true,

    //       uniqueView: true,
    //       sumValue: true,
    //       pageView: true,

    //       eventName: true,
    //       mall: true,
    //       category: true,
    //     },
    //   },
    //   {
    //     category: "ua_reportId",
    //     select: {
    //       id: true,
    //       daily: true,
    //       tracker: true,
    //       platform: true,

    //       clickCount: true,
    //       newInstallClick: true,
    //       reInstallClick: true,
    //       reOpen: true,

    //       eventName: true,
    //       mall: true,
    //       category: true,
    //     },
    //   },
    //   // 나머지 DB 쿼리 추가
    // ];
    // const results = await Promise.all(
    //   queriesEvent.map(async (query) => {
    //     const items = await prisma.sSG_DFINARY.findMany({
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //       where: {
    //         category: query.category,
    //       },
    //       select: query.select,
    //     });
    //     return items;
    //   })
    // );
    // const allItems = results.flat();
    // const uniqueItems = allItems.filter(
    //   (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    // );
    const uniqueItems = await prisma.sSG_DFINARY.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return uniqueItems;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await getDfnData();
    res.status(200).json({ items: items || [], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
