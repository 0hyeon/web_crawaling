import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { adjustDateForVercel } from "@libs/client/YesterDay";
const prisma = new PrismaClient();

async function getSsgPoDataCount({
  contains,
  startday,
  lastday,
  media,
  channel,
}: {
  contains: string;
  startday?: string | null;
  lastday?: string | null;
  media?: string | null;
  channel?: string | null;
}) {
  const whereCondition: Prisma.SSG_POWhereInput = {};
  if (contains && contains !== "") {
    whereCondition.OR = [{ itemNm: { contains: contains } }];
  }

  if (startday && lastday === null) {
    const startDate = new Date(startday);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    whereCondition.date = {
      gte: startDateString,
      lt: endDateString,
    };
  }

  if (startday !== null && lastday !== null) {
    if (startday !== undefined && lastday !== undefined) {
      const startDate = new Date(startday);
      const lastDate = new Date(lastday);
      const startDateString = startDate.toISOString().slice(0, 10);
      const endDateString = lastDate.toISOString().slice(0, 10);

      whereCondition.date = {
        gte: startDateString,
        lte: endDateString,
      };
    }
  }

  if (media && media !== null) {
    whereCondition.media = media;
  }

  if (channel && channel !== null) {
    whereCondition.channel = channel;
  }

  try {
    const count = await prisma.sSG_PO.count({
      where: whereCondition,
    });
    return count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch SSG_PO data count");
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
  const { contains, startday, lastday, media, channel } = req.query; //있어도그만 없어도그만인값
  try {
    const DataCount = await getSsgPoDataCount({
      contains: contains ? String(contains) : "",
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
      media: media !== "null" ? String(media) : null,
      channel: channel !== "null" ? String(channel) : null,
    });

    if (startday && (!DataCount || DataCount === 0)) {
      res.status(200).json({ items: [], message: "No items found" });
    } else {
      res.status(200).json({ items: DataCount || [], message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
