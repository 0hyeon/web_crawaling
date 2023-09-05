import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { getOrderBy } from "@constants/banners";
import { adjustDateForVercel } from "@libs/client/YesterDay";
import { OrderByCondition } from "types/type";

const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  orderBy,
  contains,
  startday,
  lastday,
}: {
  skip: number;
  take: number;
  orderBy: string;
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

  let orderByCondition: OrderByCondition = getOrderBy(orderBy);
  console.log("startday, lastday : ", startday, lastday);
  console.log("orderByCondition : ", orderByCondition);

  let adjustedStartday, adjustedLastday;
  if (process.env.NODE_ENV === "production") {
    // Vercel 환경에서만 보정된 날짜를 사용
    adjustedStartday = adjustDateForVercel(startday);
    adjustedLastday = adjustDateForVercel(lastday);
  } else {
    // 개발 환경에서는 보정하지 않은 날짜를 사용
    adjustedStartday = startday;
    adjustedLastday = lastday;
  }
  if (adjustedStartday && adjustedLastday === null) {
    const targetStartDate = new Date(adjustedStartday);
    const startDate = new Date(
      targetStartDate.getFullYear(),
      targetStartDate.getMonth(),
      targetStartDate.getDate()
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 다음 날짜의 00:00:00

    whereCondition.date = {
      gte: startDate.toISOString(),
      lt: endDate.toISOString(),
    };
  }

  if (adjustedStartday !== null && adjustedLastday !== null) {
    const targetStartDate = new Date(adjustedStartday as any);
    const startDate = new Date(
      targetStartDate.getFullYear(),
      targetStartDate.getMonth(),
      targetStartDate.getDate()
    );
    const targetEndDate = new Date(adjustedLastday as any);
    const endDate = new Date(
      targetEndDate.getFullYear(),
      targetEndDate.getMonth(),
      targetEndDate.getDate()
    );
    endDate.setDate(endDate.getDate() + 1); // 다음 날 자정까지로 설정

    whereCondition.date = {
      gte: startDate.toISOString(),
      lt: endDate.toISOString(),
    };
  }

  try {
    const response = await prisma.mobieBanner.findMany({
      skip: skip,
      take: take,
      ...orderByCondition,
      where: whereCondition,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take, category, orderBy, contains, startday, lastday } =
    req.query;

  if (skip == null || take == null) {
    res.status(400).json({ message: "no skip or take" });
    return;
  }

  try {
    const moBanner = await getProducts({
      skip: Number(skip),
      take: Number(take),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : "",
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
    });

    if (startday && (!moBanner || moBanner.length === 0)) {
      res.status(200).json({ items: [], message: "No items found" });
    } else {
      res.status(200).json({ items: moBanner || [], message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
