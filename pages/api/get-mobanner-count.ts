import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function getMobannerCount({
  contains,
  startday,
  lastday,
}: {
  contains: string;
  startday?: string | null;
  lastday?: string | null;
}) {
  const containsCondition =
    contains && contains !== ""
      ? {
          OR: [
            { title: { contains: contains } },
            { alt: { contains: contains } },
          ],
        }
      : undefined;

  const whereCondition: Prisma.MobieBannerWhereInput = {
    ...containsCondition,
  };

  if (startday && lastday === null) {
    const targetStartDate = new Date(startday);
    const startDate = new Date(
      targetStartDate.getFullYear(),
      targetStartDate.getMonth(),
      targetStartDate.getDate()
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 다음 날짜의 00:00:00

    whereCondition.createdAt = {
      gte: startDate,
      lt: endDate,
    };
  }

  if (startday !== null && lastday !== null) {
    const targetStartDate = new Date(startday as any);
    const startDate = new Date(
      targetStartDate.getFullYear(),
      targetStartDate.getMonth(),
      targetStartDate.getDate()
    );
    const targetEndDate = new Date(lastday as any);
    const endDate = new Date(
      targetEndDate.getFullYear(),
      targetEndDate.getMonth(),
      targetEndDate.getDate()
    );
    endDate.setDate(endDate.getDate() + 1); // 다음 날 자정까지로 설정

    whereCondition.createdAt = {
      gte: startDate,
      lt: endDate,
    };
  }

  try {
    const response = await prisma.mobieBanner
      // category default가 -1 일경우 필터링을 위해
      .count({
        where: whereCondition,
      });
    console.log("get-mobileBanner-count : ", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
type Data = {
  items?: any;
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { contains, startday, lastday } = req.query; //있어도그만 없어도그만인값
  try {
    const moBannerCounts = await getMobannerCount({
      contains: contains ? String(contains) : "",
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
    });

    if (startday && (!moBannerCounts || moBannerCounts === 0)) {
      res.status(200).json({ items: [], message: "No items found" });
    } else {
      res.status(200).json({ items: moBannerCounts || [], message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
