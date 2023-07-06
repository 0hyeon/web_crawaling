// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { getOrderBy } from "@constants/banners";
// const prisma = new PrismaClient();

// async function getProducts({
//   skip,
//   take,
//   orderBy,
//   contains,
//   startday,
//   lastday,
// }: {
//   skip: number;
//   take: number;
//   orderBy: string;
//   contains: string;
//   startday?: string;
//   lastday?: string;
// }) {
//   const containsCondition =
//     contains && contains !== ""
//       ? {
//           OR: [
//             { title: { contains: contains } },
//             { alt: { contains: contains } },
//           ],
//         }
//       : undefined;

//   console.log("startday : ", startday);
//   console.log("lastday : ", lastday);
//   const dateCondition = {
//     createdAt: {
//       gte: startday ? new Date(startday) : undefined,
//       lte: lastday ? new Date(lastday) : undefined,
//     },
//   };
//   // const orderByCondition = getOrderBy(orderBy);
//   const orderByCondition: any = getOrderBy(orderBy);
//   const whereCondition = {
//     ...containsCondition,
//     ...dateCondition,
//   };
//   try {
//     const response = await prisma.mobieBanner.findMany({
//       skip: skip,
//       take: take,
//       ...orderByCondition,
//       where: whereCondition,
//     });
//     //console.log("get-products : ", response);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
// type Data = {
//   items?: any;
//   message: string;
// };
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { skip, take, category, orderBy, contains, startday, lastday } =
//     req.query;
//   if (skip == null || take == null) {
//     //category 선택을 안하면 alert을 안보내줘도 됨 필수가 아니기때문
//     res.status(400).json({ message: "no skip or take" });
//   }
//   try {
//     const products = await getProducts({
//       skip: Number(skip),
//       take: Number(take),
//       orderBy: String(orderBy),
//       contains: contains ? String(contains) : "",
//       startday: startday ? String(startday) : "",
//       lastday: lastday ? String(lastday) : "",
//     });
//     res.status(200).json({ items: products, message: "Success" });
//   } catch (error) {
//     res.status(400).json({ message: "Failed" });
//   }
// }
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { getOrderBy } from "@constants/banners";

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

  console.log("startday: ", startday);
  console.log("lastday: ", lastday);

  const whereCondition: Prisma.MobieBannerWhereInput = {
    ...containsCondition,
  };

  if (startday) {
    whereCondition.createdAt = {
      gte: new Date(startday),
      lte: new Date(lastday ?? Date.now()), // Use current date if lastday is null
    };
  }

  const orderByCondition: any = getOrderBy(orderBy);

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
  }

  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : "",
      startday: startday ? String(startday) : null,
      lastday: lastday ? String(lastday) : null,
    });

    if (startday && (!products || products.length === 0)) {
      res.status(200).json({ items: [], message: "No items found" });
    } else {
      res.status(200).json({ items: products || [], message: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
