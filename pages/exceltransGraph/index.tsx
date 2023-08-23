import MenubarLeft from "@components/MenubarLeft";
import React, { useState, useEffect } from "react";
import MyResponsivePie from "@components/Pie";
import {
  barData,
  pieData,
  pieData2,
  pieData3,
  pieData4,
} from "@constants/data";
import dynamic from "next/dynamic";
import MyResponsiveBar from "@components/Bar";

function exceltransGraph() {
  // const MyResponsivePie = dynamic(() => import("@components/Pie"), {
  //   ssr: false,
  // });
  // const MyResponsiveBar = dynamic(() => import("@components/Bar"), {
  //   ssr: false,
  // });

  const DynamicMyResponsivePie = dynamic(() => import("@components/Pie"), {
    ssr: false,
  });
  const DynamicMyResponsiveBar = dynamic(() => import("@components/Bar"), {
    ssr: false,
  });
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 pt-16">
          <div className="mx-auto w-[70%]">
            <div className="inline-block h-[300px] w-[50%]">
              <div className="text-center">UA</div>
              <DynamicMyResponsivePie data={pieData} />
            </div>
            <div className="inline-block h-[300px] w-[50%]">
              <div className="text-center">Retargeting</div>
              <DynamicMyResponsivePie data={pieData2} />
            </div>
            <div className="inline-block h-[300px] w-[50%]">
              <div className="text-center">PROD</div>
              <DynamicMyResponsivePie data={pieData3} />
            </div>
            <div className="inline-block h-[300px] w-[50%]">
              <div className="text-center">ITET</div>
              <DynamicMyResponsivePie data={pieData4} />
            </div>
            <div className="h-[300px]">
              <DynamicMyResponsiveBar data={barData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default exceltransGraph;
