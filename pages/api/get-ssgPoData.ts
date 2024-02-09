import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { getOrderBy } from "@constants/banners";
import { adjustDateForVercel } from "@libs/client/YesterDay";
import { OrderByCondition } from "types/type";

const prisma = new PrismaClient();

async function getSsgPoData({
  skip,
  take,
  contains,
  startday,
  lastday,
  media,
  channel,
}: {
  skip: number;
  take: number;
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
    const startDate = new Date(startday); // startday를 Date 객체로 변환합니다.
    const endDate = new Date(startDate); // startDate와 같은 값을 가지는 새로운 Date 객체를 생성합니다.
    endDate.setDate(startDate.getDate() + 1); // endDate를 startDate보다 하루 뒤로 조정합니다.

    // startDate와 endDate를 문자열로 변환합니다.
    const startDateString = startDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환
    const endDateString = endDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열로 변환

    console.log("startDate : ", startDate);
    console.log("endDate : ", endDate);
    console.log("startDateString : ", startDateString);
    console.log("endDateString : ", endDateString);
    whereCondition.date = {
      gte: startDateString,
      lt: endDateString,
    };
  }

  if (lastday && lastday !== null) {
    whereCondition.date = {
      lte: new Date(lastday).toISOString(),
    };
    console.log(
      "new Date(startday).toISOString() : ",
      new Date(lastday).toISOString()
    );
  }

  if (media && media !== null) {
    whereCondition.media = media;
  }

  if (channel && channel !== null) {
    whereCondition.channel = channel;
  }

  try {
    const response = await prisma.sSG_PO.findMany({
      skip: skip,
      take: take,
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
  const { skip, take, contains, startday, lastday, media, channel } = req.query;

  if (skip == null || take == null) {
    res.status(400).json({ message: "no skip or take" });
    return;
  }

  try {
    const ssgData = await getSsgPoData({
      skip: Number(skip),
      take: Number(take),

      contains: contains ? String(contains) : "",
      startday: startday !== "null" ? String(startday) : null,
      lastday: lastday !== "null" ? String(lastday) : null,
      media: media !== "null" ? String(media) : null,
      channel: channel !== "null" ? String(channel) : null,
    });

    if (startday && (!ssgData || ssgData.length === 0)) {
      res.status(200).json({ items: [], message: "No items found" });
    } else {
      res.status(200).json({ items: ssgData || [], message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
