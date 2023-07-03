import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/clients";

interface MobileBanner {
  src: string;
  alt: string;
  title: string;
}

interface PCBanner {
  src: string;
  alt: string;
  title: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Step 1: Fetch the data
      const response = await (
        await fetch("http://127.0.0.1/hello", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      const { ok, PC, Mobile } = response;

      // Step 2: Map the data to the correct format
      // const pcbanners: PCBanner[] =
      //   PC?.map(({ src, alt, title }: PCBanner) => ({
      //     src,
      //     alt,
      //     title,
      //   })) || [];

      // const mobilebanners: MobileBanner[] =
      //   Mobile?.map(({ src, alt, title }: MobileBanner) => ({
      //     src,
      //     alt,
      //     title,
      //   })) || [];
      const form = new FormData();
      const pcbanners: PCBanner[] = [];
      for (let i = 0; i < (PC?.length ?? 0); i++) {
        const { alt, title } = PC[i];

        const { uploadURL } = await (
          await fetch("http://localhost:3000/api/files")
        ).json();
        console.log("uploadURL : ", uploadURL);
        const {
          result: { id },
        } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();

        pcbanners.push({
          src: id, // id로 src 값을 설정
          alt,
          title,
        });
      }

      const mobilebanners: MobileBanner[] = [];
      for (let i = 0; i < (Mobile?.length ?? 0); i++) {
        const { alt, title } = Mobile[i];
        const { uploadURL } = await (await fetch("/api/files")).json();
        console.log("uploadURL : ", uploadURL);
        const {
          result: { id },
        } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();

        mobilebanners.push({
          src: id, // id로 src 값을 설정
          alt,
          title,
        });
      }

      // Step 3: Create the record in the database
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

      // Step 4: Send the response
      res.json({
        ok: true,
        banner,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
