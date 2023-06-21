import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChangeEvent } from "react";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const cheerio = require("cheerio");
  // res.setHeader("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 접근 허용
  // const response = await fetch(`https://naver.com`);
  // const htmlString = await response.text();
  // const $ = cheerio.load(htmlString);
  // console.log("!", $("#container").html());

  // return res.json({
  //   // data: htmlString,
  //   data: htmlString,
  // });
  const { executablePath } = require("puppeteer");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  const stage = await page.goto("https://www.naver.com");
  const stage2 = await page.$eval("#account > div > p", (el) => el.textContent);
  console.log(stage);
  console.log(stage2);
}
