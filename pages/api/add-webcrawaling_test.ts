import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/clients";
import { checkEnvironment } from "@libs/server/useCheckEnvironment";

interface MobileBanner {
  src: string;
  alt: string;
  title: string;
}

interface PCBanner extends MobileBanner {}

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
      const pcbanners: PCBanner[] = [];
      for (let i = 0; i < (PC?.length ?? 0); i++) {
        const { alt, src, title } = PC[i];

        const { uploadURL } = await (
          await fetch(checkEnvironment().concat("/api/files"))
        ).json();

        const form = new FormData(); // 폼 생성

        // 파일을 서버에 업로드하기 위해 폼에 첨부
        const response = await fetch(src);
        const blob = await response.blob();
        form.append("file", blob);

        const result = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();
        console.log("pc result", result);

        pcbanners.push({
          src: "",
          alt,
          title,
        });
      }

      const mobilebanners: MobileBanner[] = [];
      for (let i = 0; i < (Mobile?.length ?? 0); i++) {
        const { alt, title, src } = Mobile[i];
        const { uploadURL } = await (
          await fetch(checkEnvironment().concat("/api/files"))
        ).json();

        const form = new FormData(); // 폼 생성

        // 파일을 서버에 업로드하기 위해 폼에 첨부
        const response = await fetch(src);
        const blob = await response.blob();
        form.append("file", blob);

        const result = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();
        console.log("mobile result", result);

        mobilebanners.push({
          src: "",
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
