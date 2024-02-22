import MenubarLeft from "@components/MenubarLeft";
import React, { useEffect, useState } from "react";
import { Switch } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { SSG_PO_Channel } from "@prisma/client";
import SwitchBtn from "@components/SwitchBtn";
const SSGPoSetting = () => {
  const [isMedia, setMedia] = useState<string[]>([]);
  const [allSwitchesOn, setAllSwitchesOn] = useState(false);

  // const [isChannel, setChannel] = useState([]);
  const { data: channels, refetch } = useQuery<
    { items: SSG_PO_Channel[] },
    unknown,
    SSG_PO_Channel[]
  >(
    [`/api/ssgposetting/get-ssgpochannels`],
    () =>
      fetch(`/api/ssgposetting/get-ssgpochannels`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  useEffect(() => {
    if (channels) {
      // channels 데이터에서 media 및 channel 정보 추출
      const mediaArray = channels.map((channel) => channel.media);
      // const channelArray = channels.map((channel) => channel.channel);
      // 추출된 정보를 상태에 설정
      console.log("channels : ", channels);
      setMedia(mediaArray);
    }
  }, [channels]);

  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {isMedia &&
                  isMedia.map((el, idx) => {
                    return (
                      <>
                        <div className="" key={idx}>
                          <SwitchBtn
                            media={el}
                            channels={channels?.filter(
                              (channel) => channel.media === el
                            )}
                          />
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
