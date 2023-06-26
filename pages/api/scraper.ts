import puppeteer from "puppeteer";
import axios from "axios";
import cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

// 중복 실행 방지를 위한 변수
let isExecuted = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
