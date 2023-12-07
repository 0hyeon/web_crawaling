import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function getJobkoreaBackendData() {
  try {
    const res = await prisma.jobkoreaBackendData.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const datas = await getJobkoreaBackendData();
    res.status(200).json({ items: datas || [], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
