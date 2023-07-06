import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getOrderBy } from "@constants/banners";
const prisma = new PrismaClient();

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
  startday?: string;
  lastday?: string;
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

  console.log("startday : ", startday);
  console.log("lastday : ", lastday);

  let whereCondition: any = {
    ...containsCondition,
  };

  if (startday && lastday) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        gte: new Date(startday),
        lte: new Date(),
      },
    };
  } else if (startday && !lastday) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        equals: new Date(startday),
      },
    };
  } else if (!startday && !lastday) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        lte: new Date(),
      },
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
  items?: any;
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take, category, orderBy, contains, startday, lastday } =
    req.query;
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
      startday: startday ? String(startday) : "",
      lastday: lastday ? String(lastday) : "",
    });
    res.status(200).json({ items: products, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
