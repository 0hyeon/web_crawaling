import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateChannel({
  data,
  media,
}: {
  data: string[];
  media: string;
}) {
  try {
    for (const el of data) {
      try {
        const existingChannel = await prisma.sSG_PO_Channel.findFirst({
          //find
          where: {
            channel: el,
            media:media
          },
        });

        if (!existingChannel && data.includes(el)) {
          console.log(
            `Channel ${el} does not exist in DB but exists in data, creating in DB...`
          );
          await prisma.sSG_PO_Channel.create({
            data: {
              channel: el,
              media: media,
              onOff: false,
            },
          });
        }

        const existingChannels = await prisma.sSG_PO_Channel.findMany({
          where: {
            media: media // 특정 media에 속하는 모든 channel을 가져옴
          },
        });
        for (const existingChannel of existingChannels) {
          if (!data.includes(existingChannel.channel)) {
            console.log(`Channel ${existingChannel.channel} exists in DB but not in data, deleting from DB...`);
            await prisma.sSG_PO_Channel.delete({
              where: {
                id: existingChannel.id
              }
            });
          }
        }
        
      } catch (error) {
        console.error(`Error processing channel ${el}:`, error);
      }
    }

    // return updateonOff;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, media } = req.body; // 업데이트할 ID와 Role
  try {
    const updateonOff = await updateChannel({
      data,
      media,
    });
    res.json({ updateonOff });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
}
