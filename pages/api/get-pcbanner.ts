import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getOrderBy } from "@constants/banners";
const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  orderBy,
  contains,
}: {
  skip: number;
  take: number;
  orderBy: string;
  contains: string;
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

  console.log("orderBy : ", orderBy);
  console.log("contains : ", orderBy);
  // const orderByCondition = getOrderBy(orderBy);
  const orderByCondition: any = getOrderBy(orderBy);

  try {
    const response = await prisma.pcBanner.findMany({
      skip: skip,
      take: take,
      ...orderByCondition,
      where: containsCondition,
    });
    console.log("get-products : ", response);
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
  const { skip, take, category, orderBy, contains } = req.query;
  if (skip == null || take == null) {
    //category 선택을 안하면 alert을 안보내줘도 됨 필수가 아니기때문
    res.status(400).json({ message: "no skip or take" });
  }
  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : "",
    });
    res.status(200).json({ items: products, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
