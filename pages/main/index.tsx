import Image from "next/image";
import React, { useState, useEffect } from "react";
import AnalistIcon from "../../public/asset/svg/AnalistIcon";
import Accordion from "@components/Accordian";
import SettingIcon from "public/asset/svg/SettingIcon";
import { useQuery } from "@tanstack/react-query";
import useMutation from "@libs/client/useMutation";
import { Banner } from "@prisma/client";
// import Pie from "@components/Pie";
// import { pieData } from "@constants/data";

interface UploadProductMutation {
  ok: boolean;
  banner: Banner;
}
const Main = () => {
  const [isData, setData] = useState([]);

  const CRAWALING_QUERY_KEY = "/api/add-webcrawaling_test";

  const { data: fetchData } = useQuery<{ items: any[] }, unknown, any[]>(
    [CRAWALING_QUERY_KEY],
    () => fetch(CRAWALING_QUERY_KEY).then((res) => res.json())
    // .then((res) => res.json())
    // .then((data) => data)
  );
  console.log("fetchData : ", fetchData);
  useEffect(() => {
    console.log("useEffect실행");
  }, [fetchData]);
  return (
    <>
      <div className="fix fixed h-[100vh] w-64 border-r-2 bg-white">
        <div className="bg align-center flex h-16 justify-center bg-[#efefef] py-4">
          <Image
            priority={true}
            alt="LogoText"
            src={"/images/contact_title01.png"}
            width={220}
            height={50}
            className="mx-auto object-contain"
          ></Image>
        </div>
        <div className="align-center flex h-44 flex-col justify-center border-b-[1px] p-4">
          <div className="py-1.5">
            <Image
              priority={true}
              alt="LogoImage"
              src={"/images/logo.ico"}
              width={40}
              height={200}
              className="mx-auto"
            />
          </div>
          <div className="align-center flex justify-center p-2 text-lg font-bold text-gray-500">
            그린브릭스컴퍼니
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex">
            <div className="mt-[19px] flex">
              <AnalistIcon width={25} height={25} />
            </div>
            <Accordion summary={"Service"}>
              {[1, 2, 3, 4, 5].map((el, idx) => {
                return (
                  <ul key={idx}>
                    <li className="py-4 duration-75 hover:text-[#228ae6]">
                      {idx + 1}menu
                    </li>
                  </ul>
                );
              })}
            </Accordion>
          </div>
        </div>
        <div className="px-4">
          <div className="flex">
            <div className="mt-[19px] flex">
              <SettingIcon width={25} height={25} />
            </div>
            <Accordion summary={"Service"}>
              {[1, 2, 3, 4, 5].map((el, idx) => {
                return (
                  <ul key={idx}>
                    <li className="cursor-pointer py-4 duration-75 hover:text-[#228ae6]">
                      {idx + 1}menu
                    </li>
                  </ul>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
      <div className="h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="h-16 w-full bg-white px-12"></div>
        <div className="mx-4 my-4 bg-white px-4 py-4">
          {`{ "Mobile": { "src": [ "https://ssl.pstatic.net/melona/libs/1455/1455180/c54cda675a7d60d485ac_20230623114338029.png", "https://ssl.pstatic.net/melona/libs/1455/1455190/07c87b93a24c8d0f90b8_20230626112552012.png", "https://ssl.pstatic.net/melona/libs/1455/1455180/20ec1d0b9f8c04bcaa21_20230623114258487.png", "https://ssl.pstatic.net/melona/libs/1455/1455190/fba1c817e474a59d861f_20230626113738620.png" ], "alt": "[광고]하루 1시간도 운전 안한다면? 탄만큼 내는(특약) 캐롯퍼마일자동차보험", "replaceName": "2023062620ec1d0b9f8c04bcaa21_20230623114258487.png", "title": "캐롯 퍼마일자동차보험" }, "PC": { "src": [ "https://ssl.pstatic.net/melona/libs/1454/1454135/be5019225c6610fec37c_20230626103842549.jpg" ], "alt": "[광고]유산균은 락토핏 골드 종근당 건강 최대 37% 할인", "replaceName": "20230626be5019225c6610fec37c_20230626103842549.jpg", "url": "https://campaign.naver.com/healthychart/brand/?dtm_source=naver_timeboard&dtm_medium=display&dtm_campaign=hchart&pcode=naver_timeboard" } }`}
        </div>
        <div>{/* <Pie data={pieData} /> */}</div>
      </div>
    </>
  );
};

export default Main;
