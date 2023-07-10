import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/clients";
import { checkEnvironment } from "@libs/server/useCheckEnvironment";

interface MobileBanner {
  src: string;
  alt: string;
  title: string;
  href?: string;
}

interface PCBanner extends MobileBanner {}

async function uploadImageAndGetId(url: string, replaceName: string) {
  const { uploadURL } = await (await fetch(url)).json();
  const response = await fetch(url);

  const blob = await response.blob();
  const form = new FormData();
  form.append("file", blob, replaceName);
  const {
    result: { id },
  } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
  return id;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://43.202.29.183/hello"
          : "http://43.202.29.183/hello";

      const response = await fetch(url);
      // console.log("response  :", response);
      // console.log("await response.text() : ", await response.text());
      const data = await response.text(); // Retrieve response body as text

      const { PC, Mobile } = JSON.parse(data); // Parse the response manually

      const pcbanners: PCBanner[] = await Promise.all(
        PC?.map(async (item: PCBanner) => {
          const { alt, title, src, href } = item;
          const id = await uploadImageAndGetId(
            checkEnvironment().concat("/api/files"),
            src
          );
          return {
            src: id,
            alt,
            title,
            href,
          };
        })
      );

      const mobilebanners: MobileBanner[] = await Promise.all(
        Mobile?.map(async (item: MobileBanner) => {
          const { alt, title, src, href } = item;
          const id = await uploadImageAndGetId(
            checkEnvironment().concat("/api/files"),
            src
          );
          return {
            src: id,
            alt,
            title,
            href,
          };
        })
      );

      const banners = await client.banner.create({
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
        banners,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
