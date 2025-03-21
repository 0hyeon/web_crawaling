"use client";
import React, { useState } from "react";
import { Input } from "@mantine/core";
import MenubarLeft from "@components/MenubarLeft";

const typoMap: Record<string, string> = {
  ture: "true",
  flase: "false",
};

const parseParams = (url: string) => {
    const result: {
      key: string;
      value: string;
      isTypo: boolean;
      correct?: string;
    }[] = [];
  
    // 쿼리 파라미터 (? 이후 ~ # 전)
    const queryMatch = url.split("?")[1]?.split("#")[0];
    const queryParams = queryMatch?.split("&") ?? [];
  
    // 해시 파라미터 (# 이후 전부)
    const hashIndex = url.indexOf("#");
    const hashParams =
      hashIndex !== -1 ? url.substring(hashIndex + 1).split("&") : [];
  
    const allParams = [...queryParams, ...hashParams];
  
    for (const param of allParams) {
      if (!param.includes("=")) continue; // key=value 아닌 경우 무시
      const [key, value] = param.split("=");
      const isTypo = value in typoMap;
      result.push({ key, value, isTypo, correct: typoMap[value] });
    }
  
    return result;
  };
  

const keyColors = [
  "text-red-600",
  "text-blue-600",
  "text-green-600",
  "text-yellow-600",
  "text-purple-600",
];

const SsgPoData = () => {
  const [keyword, setKeyword] = useState("https://greenbricks.onelink.me/4KSi?pid=tossa3u_int&af_siteid={SITE_ID}&c=paid_Reward_tossa3u_int_quiz_240317&af_adset=250317_quiz2&af_ad=250317_quiz&af_force_deeplink=ture&is_retargeting=flase#zero&utm_campaign=super365&utm_source=da&utm_medium=naver_bs&utm_content=pc&utm_term=1_all_A_zero#zero");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const parsed = parseParams(keyword);

  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="min-h-[100vh] w-full bg-white px-4 py-16">
          <div className="flex items-center justify-between">
            <div className="relative flex w-full"> {/* ⬅ input 길이 늘림 */}
              <Input
               icon={
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                    </svg>
                }
                className="w-full"
                placeholder="Utm Link here!"
                value={keyword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 space-y-4">
          {parsed.map(({ key, value, isTypo, correct }, idx) => {
  const hue = (idx * 137) % 360;
  const colorStyle = { color: `hsl(${hue}, 70%, 40%)` };

  return (
    <div
      key={idx}
      className="flex items-start space-x-4 rounded-lg border p-4 shadow-sm bg-white"
    >
      <div className="flex flex-col min-w-[250px]">
        <span className="text-sm font-semibold text-gray-500">Key</span>
        <span className="text-lg font-bold" style={colorStyle}>
          {key}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-500">Value</span>
        <span
          className={`text-lg ${
            isTypo ? "text-red-600 underline decoration-red-500" : "text-gray-800"
          }`}
        >
          {value}
        </span>
        {isTypo && (
          <span className="text-sm text-orange-500 mt-1">
            (혹시.. <span className="font-bold">{correct}</span>?)
          </span>
        )}
      </div>
    </div>
  );
})}

          </div>
        </div>
      </div>
    </>
  );
};

export default SsgPoData;
