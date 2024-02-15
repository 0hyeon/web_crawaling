import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import * as O from "../../utils/option";
const prisma = new PrismaClient();

async function getSsgPoDataPrice({
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
    const response = await prisma.sSG_PO.findMany({
      where: whereCondition,
    });

    const totalRlordAmt = O.getOrElse(
      O.fromUndefined(
        response.reduce((acc, cur) => acc + (cur.rlordAmt || 0), 0)
      ),
      0
    );
    const uniqueOrdNoCount = Array.from(
      new Set(
        O.getOrElse(O.fromUndefined(response.map((item) => item.ordNo)), [])
      )
    ).length;
    console.log(totalRlordAmt, uniqueOrdNoCount);
    return [totalRlordAmt, uniqueOrdNoCount];
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { contains, startday, lastday, media, channel } = req.query;

  try {
    const ssgDataPrice: any = await getSsgPoDataPrice({
      contains: contains ? String(contains) : "",
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
      media: media !== "null" ? String(media) : null,
      channel: channel !== "null" ? String(channel) : null,
    });

    res.status(200).json({ items: ssgDataPrice, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
