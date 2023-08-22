import MenubarLeft from "@components/MenubarLeft";
import React, { useState, useEffect } from "react";
import MyResponsivePie from "@components/Pie";
import { barData, pieData } from "@constants/data";
import dynamic from "next/dynamic";
import MyResponsiveBar from "@components/Bar";

function exceltransGraph() {
  const MyResponsivePie = dynamic(() => import("@components/Pie"), {
    ssr: false,
  });
  const MyResponsiveBar = dynamic(() => import("@components/Bar"), {
    ssr: false,
  });
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 pt-16">
          <div className="mx-auto w-[70%]">
            <div className="float-left h-[300px] w-[50%]">
              <div className="text-center">UA</div>
              <MyResponsivePie data={pieData} />
            </div>
            <div className="float-left h-[300px] w-[50%]">
              <div className="text-center">Retargeting</div>
              <MyResponsivePie data={pieData} />
            </div>
            <div className="float-left h-[300px] w-[50%]">
              <div className="text-center">PROD</div>
              <MyResponsivePie data={pieData} />
            </div>
            <div className="float-left h-[300px] w-[50%]">
              <div className="text-center">ITET</div>
              <MyResponsivePie data={pieData} />
            </div>
            <div className="h-[300px]">
              <MyResponsiveBar data={barData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default exceltransGraph;
