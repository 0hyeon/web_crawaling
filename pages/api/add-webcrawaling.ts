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
  if (req.method === "GET") {
    const response = await (
      await fetch("http://127.0.0.1/hello", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    const { ok, PC, Mobile } = response;

    const pcbanners =
      PC?.map(({ src, alt, title }: PCBanner) => ({
        src,
        alt,
        title,
      })) || [];

    const mobilebanners =
      Mobile?.map(({ src, alt, title }: MobileBanner) => ({
        src,
        alt,
        title,
      })) || [];

    const banner = await client.banner.create({
      data: {
        pcbanners: {
          createMany: {
            data: pcbanners,
          },
        },
        mobilebanners: {
          createMany: {
            data: mobilebanners,
          },
        },
      },
      include: {
        pcbanners: true,
        mobilebanners: true,
      },
    });

    res.json({
      ok: true,
      banner,
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
