import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateSSGPO({ data }: { data: string[] }) {
  try {
    console.log("udtSSGPO : ", data);
    // udtSSGPO 배열에 있는 ID에 해당하는 레코드들의 onOff 값을 업데이트
    const updateonOff = await prisma.sSG_PO_Channel.updateMany({
      where: {
        id: {
          in: data.map(Number), // udtSSGPO 배열에 있는 ID에 해당하는 레코드들
        },
      },
      data: {
        onOff: true, // udtSSGPO 배열에 있는 ID에 해당하는 레코드들의 onOff 값을 true로 설정
      },
    });

    // udtSSGPO 배열에 해당하지 않는 모든 레코드들의 onOff 값을 false로 설정
    await prisma.sSG_PO_Channel.updateMany({
      where: {
        NOT: {
          id: {
            in: data.map(Number), // udtSSGPO 배열에 있는 ID에 해당하지 않는 레코드들
          },
        },
      },
      data: {
        onOff: false, // udtSSGPO 배열에 해당하지 않는 모든 레코드들의 onOff 값을 false로 설정
      },
    });
    return updateonOff;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body; // 업데이트할 ID와 Role
  try {
    const updateonOff = await updateSSGPO({
      data,
    });
    res.json({ updateonOff });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
}
