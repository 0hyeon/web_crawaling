import React, { useEffect, useState } from "react";
import Image from "next/image";
import Accordion from "./Accordian";
import ImageIcon from "public/asset/svg/ImageIcon";
import { useRouter } from "next/router";
import Chartbar from "public/asset/svg/Chartbar";
import ExcelIcon from "public/asset/svg/ExcelIcon";
import * as O from "../utils/option";
import { useRecoilState } from "recoil";
import { loginState } from "atoms";
function MenubarLeft() {
  const MenuList = O.fromUndefined(["타임보드", "스페셜DM"]);
  const router = useRouter();
  const [view, setview] = useState<boolean>(false);
  const [isLogin, setLogin] = useRecoilState(loginState);
  console.log("isLogin :", isLogin);

  const onClickRouterLink = (menu: string) => {
    if (menu === "타임보드") {
      router.push("/pcbanner");
    } else if (menu === "스페셜DM") {
      router.push("/mbanner");
    } else if (menu === "앱스플라이어 & 잡코리아") {
      router.push("/exceltrans");
    } else if (menu === "앱스플라이어 & 알바몬") {
      router.push("/exceltransAlbamon");
    } else if (menu === "잡코리아 시각화(작업중)") {
      router.push("/exceltransGraph");
    } else if (menu === "트래킹조회") {
      router.push("/trackingPage");
    } else if (menu === "엑셀로직") {
      router.push("/excelLogic");
    } else if (menu === "권한수정") {
      router.push("/editRoll");
    } else if (menu === "[ssgㆍ이마트] cauly") {
      router.push("/caulyLogic");
    } else if (menu === "[코보게임즈] 이커머스") {
      router.push("/kobogames");
    }
  };
  useEffect(() => {
    if (isLogin && isLogin) {
      if (isLogin.roll < 3) setview(isLogin);
    }
    if (isLogin.id === undefined) {
      router.push("/login");
    }
  }, [isLogin]);

  return (
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
            width={30}
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="align-center flex justify-center p-2 text-sm font-bold text-gray-500">
          그린브릭스컴퍼니
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex">
          <div className="mt-[19px] flex">
            <ImageIcon width={25} height={25} />
          </div>
          <Accordion summary={"Banner"}>
            {O.mapOrElse(
              MenuList,
              (dataTodos) =>
                dataTodos.map((el, idx) => {
                  return (
                    <ul key={idx} className="cursor-pointer rounded-sm pl-3 ">
                      <li
                        onClick={() => onClickRouterLink(el)}
                        className="py-4 text-[#000] transition-colors duration-75 hover:text-[#228ae6]"
                      >
                        {el}
                      </li>
                    </ul>
                  );
                }),
              []
            )}

            {/* {["타임보드", "스페셜DM"].map((el, idx) => {
              return (
                <ul key={idx} className="cursor-pointer rounded-sm pl-3 ">
                  <li
                    onClick={() => onClickRouterLink(el)}
                    className="py-4 text-[#000] transition-colors duration-75 hover:text-[#228ae6]"
                  >
                    {el}
                  </li>
                </ul>
              );
            })} */}
          </Accordion>
        </div>
      </div>
      <div className="px-4">
        <div className="flex">
          <div className="mt-[19px] flex">
            <Chartbar width={25} height={25} />
          </div>
          <Accordion summary={"Daily Report"}>
            {[
              "앱스플라이어 & 잡코리아",
              "앱스플라이어 & 알바몬",
              "잡코리아 시각화",
              "트래킹조회",
              "[ssgㆍ이마트] cauly",
              "[코보게임즈] 이커머스",
            ].map((el, idx) => {
              return (
                <ul key={idx}>
                  <li
                    onClick={() => onClickRouterLink(el)}
                    className="cursor-pointer py-4 duration-75 hover:text-[#228ae6]"
                  >
                    {el}
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
            <ExcelIcon width={25} height={25} />
          </div>
          <Accordion summary={"Excel"}>
            {["엑셀로직"].map((el, idx) => {
              return (
                <ul key={idx}>
                  <li
                    onClick={() => onClickRouterLink(el)}
                    className="cursor-pointer py-4 duration-75 hover:text-[#228ae6]"
                  >
                    {el}
                  </li>
                </ul>
              );
            })}
          </Accordion>
        </div>
      </div>
      {view && view ? (
        <div className="px-4">
          <div className="flex">
            <div className="mt-[19px] flex">
              <ExcelIcon width={25} height={25} />
            </div>
            <Accordion summary={"권한"}>
              {["권한수정"].map((el, idx) => {
                return (
                  <ul key={idx}>
                    <li
                      onClick={() => onClickRouterLink(el)}
                      className="cursor-pointer py-4 duration-75 hover:text-[#228ae6]"
                    >
                      {el}
                    </li>
                  </ul>
                );
              })}
            </Accordion>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MenubarLeft;
