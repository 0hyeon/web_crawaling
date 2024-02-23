import MenubarLeft from "@components/MenubarLeft";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SSG_PO_Channel } from "@prisma/client";
import SwitchBtn from "@components/SwitchBtn";
import { Switch, Group, Button } from "@mantine/core";
const SSGPoSetting = () => {
  const [isMedia, setMedia] = useState<string[]>([]);
  const [isTrue, setTrue] = useState<string[]>([]);
  const [allSwitchesOn, setAllSwitchesOn] = useState(false);
  const [value, setValue] = useState<string[]>([]);
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
  const alertFn = () => {
    return alert("현재 개발셀에서 제어중입니다");
  };
  const filterFn = useCallback((channel: SSG_PO_Channel[]) => {
    return channel
      .filter((el) => el.onOff === true)
      .map((el) => {
        return String(el.id);
      });
  }, []);

  useEffect(() => {
    if (channels) {
      const mediaArray = Array.from(
        new Set(channels.map((channel) => channel.media))
      );
      setMedia(mediaArray);
      const data = filterFn(channels);
      // setTrue(data);
      setValue(data);
    }
  }, [channels, filterFn]);

  useEffect(() => {
    console.log("value : ", value);
  }, [value]); // value 상태가 변경될 때마다 useEffect 실행
  console.log("channels : ", channels);
  console.log("isMedia : ", isMedia);
  console.log("isTrue : ", isTrue);
  console.log(["1", "2"]);

  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <Switch.Group value={value} onChange={setValue}>
                  {isMedia &&
                    isMedia.map((media, idx) => {
                      return (
                        <>
                          <div className="mb-8" key={`${media}_${idx}`}>
                            <div className="text-base text-gray-500">
                              {media}
                            </div>
                            <div className="" key={idx}>
                              <Group mt="xs" className="flex">
                                {channels &&
                                  channels
                                    ?.filter((el) => el.media === media)
                                    .map((el: any) => {
                                      return (
                                        <Switch
                                          size="lg"
                                          key={`${el.id}`}
                                          value={`${el.id}`}
                                          label={el.channel}
                                        />
                                      );
                                    })}
                              </Group>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </Switch.Group>
                <div className="flex gap-3">
                  <button
                    onClick={alertFn}
                    className="w-20 rounded-md bg-blue-500 p-2 text-white"
                  >
                    저장
                  </button>
                  <button
                    onClick={alertFn}
                    className="w-20 rounded-md bg-red-400 p-2 text-white"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SSGPoSetting;
