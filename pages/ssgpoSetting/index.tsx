import MenubarLeft from "@components/MenubarLeft";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SSG_PO_Channel, SSG_PO_Media } from "@prisma/client";
import SwitchBtn from "@components/SwitchBtn";
import { Switch, Group, Button } from "@mantine/core";
import useMutation from "@libs/client/useMutation";
import { MutationResult } from "types/type";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import * as O from "../../utils/option";
import Layout from "@components/layout";
import Link from "next/link";
import ArrowRightIcon from "public/asset/svg/ArrowRight";
import { SSG_PO_MediaWithChannel } from "./[id]";
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
  const { data: mediaData, refetch: mediaRefetch } = useQuery<
    { items: SSG_PO_MediaWithChannel[] },
    unknown,
    SSG_PO_MediaWithChannel[]
  >(
    [`/api/ssgposetting/get-ssgpomedia`],
    () => fetch(`/api/ssgposetting/get-ssgpomedia`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  const [uptonOff, { loading: upt_loading, data: upt_data, error: upt_error }] =
    useMutation<MutationResult>(
      `${FEcheckEnvironment().concat("/api/ssgposetting/udt-ssgposetting")}`,
      async () => {
        try {
          await refetch();
        } catch (error) {
          console.error("Error refetching data:", error);
        }
      }
    );
  const filterFn = useCallback((channel: SSG_PO_Channel[]) => {
    return channel
      .filter((el) => el.onOff === true)
      .map((el) => {
        return String(el.id);
      });
  }, []);
  const calcleFn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await refetch();
    const data = filterFn(O.getOrElse(O.fromUndefined(channels), []));
    setValue(data);
    alert("취소완료");
  };
  const submitFn = async (
    data: string[],
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (confirm("수정하시겠습니까")) {
      try {
        await uptonOff({ data });
        refetch();
        alert("수정완료");
      } catch (e) {
        console.error("Error deleting user:", e);
        alert("수정에 실패했습니다.");
      }
    }
  };

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

  // useEffect(() => {
  //   console.log("value : ", value);
  // }, [value]); // value 상태가 변경될 때마다 useEffect 실행
  // console.log("channels : ", channels);
  // console.log("isMedia : ", isMedia);
  console.log("mediaData : ", mediaData);

  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        SSG 수집제어
      </div>
      <Switch.Group value={value} onChange={setValue}>
        {isMedia &&
          isMedia.map((media, idx) => {
            return (
              <>
                <div className="mb-4 border-b-2 p-3" key={`${media}_${idx}`}>
                  <Link
                    href={`ssgpoSetting/${media}`}
                    className="mb-3 inline-flex items-center gap-2 font-mono  text-gray-500 text-lg"
                    >
                    <span>
                    {media}<span>({mediaData?.filter((el:SSG_PO_Media)=> el.media === media).map((el)=>el.channel).map((el)=> el.length)})</span>
                    </span>
                    <ArrowRightIcon />
                  </Link>
                  <div className="pl-4" key={idx}>
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
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={(e) => submitFn(value, e)}
          className="w-24 rounded-md bg-blue-500 p-2 text-white"
        >
          저장
        </button>
        <button
          onClick={(e) => calcleFn(e)}
          className="w-24 rounded-md bg-red-400 p-2 text-white"
        >
          취소
        </button>
      </div>
    </Layout>
  );
};

export default SSGPoSetting;
