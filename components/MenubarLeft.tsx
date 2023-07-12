import React from "react";
import Image from "next/image";
import AnalistIcon from "public/asset/svg/AnalistIcon";
import Accordion from "./Accordian";
import SettingIcon from "public/asset/svg/SettingIcon";
import ImageIcon from "public/asset/svg/ImageIcon";
import { Router, useRouter } from "next/router";
import Chartbar from "public/asset/svg/Chartbar";
function MenubarLeft() {
  const router = useRouter();
  const onClickRouterLink = (menu: string) => {
    if (menu === "타임보드") {
      router.push("/pcbanner");
    } else if (menu === "스페셜DM") {
      router.push("/mbanner");
    }
  };

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
            <ImageIcon width={25} height={25} />
          </div>
          <Accordion summary={"Banner"}>
            {["타임보드", "스페셜DM"].map((el, idx) => {
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
            })}
          </Accordion>
        </div>
      </div>
      <div className="px-4">
        <div className="flex">
          <div className="mt-[19px] flex">
            <Chartbar width={25} height={25} />
          </div>
          <Accordion summary={"Service"}>
            {[1].map((el, idx) => {
              return (
                <ul key={idx}>
                  <li className="cursor-pointer py-4 duration-75 hover:text-[#228ae6]">
                    {/* {idx + 1}menu(서비스예정) */}
                  </li>
                </ul>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default MenubarLeft;
