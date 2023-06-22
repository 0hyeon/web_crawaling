import puppeteer from "puppeteer";
import axios from "axios";
import cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

// 중복 실행 방지를 위한 변수
let isExecuted = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({ headless: "new" });
  // 이미 실행된 경우 중복 실행하지 않고 종료
  if (isExecuted) {
    return res.status(200).json({ message: "Already executed" });
  }
  // const browser = await puppeteer.launch({
  //   executablePath: '/usr/bin/google-chrome-stable',
  //   // 기타 옵션들...
  // });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  try {
    // 네이버 메인 페이지로 이동
    await page.goto("https://www.naver.com");

    // "veta_top_inner_tgtLREC" 이름의 iframe 찾기
    const iframeElement = await page.$('iframe[id="ad_timeboard_tgtLREC"]');
    const iframeContent = await iframeElement?.contentFrame();
    if (iframeContent) {
      console.log("웹크롤링 진입");
      // iframe 내부에서 30초 동안 대기
      await iframeContent.waitForTimeout(10000);

      // iframe 내부의 HTML 가져오기
      const html = await iframeContent.content();
      // Cheerio를 사용하여 HTML 파싱
      const $ = cheerio.load(html);

      // 이미지 추출
      const imageSrc = $("#gfp_sf_align img").attr("src");
      console.log("원본이미지 : ", imageSrc);
      const imgNm = imageSrc
        ? `${new Date().toISOString().slice(0, 10)}${imageSrc.split("/").pop()}`
        : "";
      console.log(
        "원본이미지 삭제를 우려하여 DB에 새로 업로드할사진이름 : ",
        imgNm
      );

      //이미지 설명추출
      const desc = $("#gfp_sf_align img").attr("alt");
      console.log("광고문구 : ", desc);

      //링크 추출
      const href = $("#gfp_sf_align a").attr("href");
      const url = href;
      console.log("랜더링 링크 : ", href);
      // browser.disconnect();
      //중복 실행 방지를 위해 변수 갱신

      //브랜드추출
      await page.goto(`${href}`);
      await iframeContent.waitForTimeout(10000);

      let ogSiteName = await page.evaluate(() => {
        const metaElement = document.querySelector(
          'meta[property="og:site_name"]'
        );
        const metaElement2 = document.querySelector(
          'meta[property="og:title"]'
        );
        return metaElement
          ? metaElement.getAttribute("content")
          : metaElement2
          ? metaElement2.getAttribute("content")
          : "";
      });

      console.log("브랜드 : ", ogSiteName);

      //로직 중복방지
      isExecuted = true;

      return res.json({ imageSrc: imageSrc, imgNm, desc, href, ogSiteName });
    } else {
      return res.json({
        imageSrc: "",
        imgNm: "",
        desc: "",
        href: "",
        ogSiteName: "",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred" });
  } finally {
    await browser.close();
  }
}
