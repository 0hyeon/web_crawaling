import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/clients";

interface MobileBanner {
  src: string;
  alt: string;
  title: string;
}
interface PCBanner extends MobileBanner {}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      body: { ok, PC, Mobile },
    } = req;
    console.log("ok: ", ok);
    console.log("PC: ", PC);
    console.log("Mobile: ", Mobile);

    const pcbanners = PC.map(({ src, alt, title }: PCBanner) => ({
      where: { src, alt, title },
      create: { src, alt, title },
    }));

    const mobilebanners = Mobile.map(({ src, alt, title }: MobileBanner) => ({
      where: { src, alt, title },
      create: { src, alt, title },
    }));

    const banner = await client.banner.create({
      data: {
        pcbanners: {
          connectOrCreate: pcbanners,
        },
        mobilebanners: {
          connectOrCreate: mobilebanners,
        },
      },
    });

    res.json({
      ok: true,
      banner,
    });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
