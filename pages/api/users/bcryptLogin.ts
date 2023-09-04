import * as bcrypt from "bcrypt"; // 바뀐 부분
import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
const prisma = new PrismaClient();
interface RequestBody {
  name: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name: userId } = req.body;

  const hashedId = await bcrypt.hash(userId, 10);
  console.log("hashedId : ", hashedId);
  sessionStorage.setItem("hashedId", hashedId);

  res.json({ ok: true, hashedId: hashedId });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
