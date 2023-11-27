import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateUser({ id, roll }: { id: number; roll: string }) {
  let updatedRoll: number | undefined;

  switch (roll) {
    case 'C레벨':
      updatedRoll = 1;
      break;
    case '셀장':
      updatedRoll = 2;
      break;
    case '과장':
      updatedRoll = 3;
      break;
    case '대리':
      updatedRoll = 4;
      break;
    case '사원':
      updatedRoll = 5;
      break;
    default:
      throw new Error('Invalid roll value');
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        roll: updatedRoll // 업데이트할 필드와 값을 설정합니다.
        // 다른 필드를 업데이트하려면 이곳에 해당 필드와 값을 추가합니다.
      }
    });
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, roll } = req.body; // 업데이트할 ID와 Role
  try {
    const updatedUser = await updateUser({ id: Number(id), roll:String(roll) });
    res.json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
}
