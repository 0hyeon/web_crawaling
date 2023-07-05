import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getProductsCount(category: number, contains: string) {
  const containsCondition =
    contains && contains !== ""
      ? {
          name: { contains: contains },
        }
      : undefined;
  //넘어오는 default 탭 value -1이 우리 db상에는 없어서 필터링 필요
  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined; // category -1일경우
  try {
    const response = await prisma.banner
      // category default가 -1 일경우 필터링을 위해
      // .count({
      //   where: {
      //     category_id: category,
      //   },
      // })
      .count();
    console.log("get-products-count : ", response);
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
  const { category, contains } = req.query; //있어도그만 없어도그만인값
  try {
    const products = await getProductsCount(Number(category), String(contains)); //넘길땐 Number 갖고올땐 String
    res.status(200).json({ items: products, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
