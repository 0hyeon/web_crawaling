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
    console.log();
    const pcUploads = PC?.map(async ({ src, alt, title }: PCBanner) => {
      console.log("src : ", src);
      const form = new FormData();
      form.append("file", src);
      console.log("form : ", form);
      const { uploadURL } = await (
        await fetch("http://localhost:3000/api/files")
      ).json();
      console.log("uploadURL : ", uploadURL);
      const { result } = await (
        await fetch(uploadURL, { method: "POST", body: form })
      ).json();

      console.log("result: ", result);
      return {
        src: uploadURL,
        alt,
        title,
        id: result.id,
      };
    });

    const mobileUploads = Mobile?.map(
      async ({ src, alt, title }: MobileBanner) => {
        const form = new FormData();
        form.append("file", src);

        const { uploadURL } = await (
          await fetch("http://localhost:3000/api/files")
        ).json();
        console.log("uploadURL : ", uploadURL);
        const { result } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();
        console.log("uploadURL : ", uploadURL);
        console.log("result: ", result);
        return {
          src: uploadURL,
          alt,
          title,
          id: result.id,
        };
      }
    );

    const pcbanners = pcUploads ? await Promise.all(pcUploads) : [];
    const mobilebanners = mobileUploads ? await Promise.all(mobileUploads) : [];

    const dummyId = [
      ...pcbanners.map((banner) => banner.id),
      ...mobilebanners.map((banner) => banner.id),
    ];

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
      dummyId,
    });
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
