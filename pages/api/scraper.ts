import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChangeEvent } from "react";
import cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 접근 허용
  const response = await fetch(`http://www.naver.com`);
  const htmlString = await response.text();

  const $ = cheerio.load(htmlString);
  const ogTitle = $(".TodayPick_title__zx8kL");

  return res.json({
    data: htmlString,
  });
}
