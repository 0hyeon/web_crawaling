import type { NextApiRequest, NextApiResponse } from "next";
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let url;
  if (process.env.NODE_ENV === "development") {
    url = "http://127.0.0.1/add-pcWebcrawaling";
  } else {
    url = "http://43.202.29.183/add-pcWebcrawaling";
  }

  if (req.method === "GET") {
    try {
      const response = await (
        await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      const { PC } = response;
      const pcbanners: PCBanner[] = [];
      for (let i = 0; i < (PC?.length ?? 0); i++) {
        const { alt, title, src, replaceName, href } = PC[i];

        /*cloudfalre에 업로드 요청할 빈url 요청*/
        const { uploadURL } = await (
          await fetch(checkEnvironment().concat("/api/files"))
        ).json();

        /* 이미지 저장할 폼데이터 */
        const form = new FormData();

        /* 파일을 서버에 업로드하기 위해 폼에 첨부 */
        const response = await fetch(src);
        const blob = await response.blob();
        form.append("file", blob, replaceName);

        /* cloudflare로 이미지전송 post로 한 response, id는 이미지 조회시 필요 */
        const {
          result: { id },
        } = await (
          await fetch(uploadURL, { method: "POST", body: form })
        ).json();

        console.log("pc result id : ", id);
        /* 메인db에 push */
        pcbanners.push({
          src: id,
          alt,
          title,
          href,
        });
      }
      const banners = await client.pcBanner.createMany({
        data: pcbanners,
      });
      console.log("error create banner : ", banners);
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