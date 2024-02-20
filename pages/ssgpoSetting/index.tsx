import MenubarLeft from "@components/MenubarLeft";
import React from "react";
import { Switch } from "@mantine/core";

const SSGPoSetting = () => {
  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-52">
                {[
                  "카울리",
                  "카울리",
                  "카울리",
                  "카울리",
                  "카울리",
                  "카울리",
                  "카울리",
                ].map((el, idx) => {
                  return (
                    <>
                      <div className="">
                        <div>{el}</div>
                        <Switch size="xl" onLabel="ON" offLabel="OFF" />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SSGPoSetting;
