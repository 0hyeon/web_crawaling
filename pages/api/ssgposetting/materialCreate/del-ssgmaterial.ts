import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function delMaterial({ id }: { id: number }) {
  try {
    const res = await prisma.sSG_DFINARY_TrackingLinkList.delete({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.body.id); // DELETE 요청으로 받은 ID
  console.log("del-ser-id :", req.body);
  try {
    const deletedUser = await delMaterial({ id });
    console.log("deletedUser : ", deletedUser);
    res.json({ deletedUser, errors: { message: "존재하지 않는계정입니다" } });
  } catch (error) {
    res.json({ errors: { message: "존재하지 않는계정입니다" } });
  }
}
