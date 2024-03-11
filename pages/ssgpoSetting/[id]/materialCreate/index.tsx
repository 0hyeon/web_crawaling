"use client";
import Layout from "@components/layout";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as O from "../../../../utils/option";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import useMutation from "@libs/client/useMutation";
import { ChannelInfo, MutationResult } from "types/type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SSG_PO_MediaWithChannel } from "..";
import Link from "next/link";
import ArrowRightIcon from "public/asset/svg/ArrowRight";


const MeterialCreate = (props: any) => {
  const router = useRouter();
  const path = usePathname();
  const decodedPath = decodeURIComponent(path); // URL 디코딩
  const media = decodedPath.split("/")[2];
  const [value, setValue] = useState<string[]>([]);
  const [isData, setData] = useState<any>();
  const [isAllData, setAllData] = useState<ChannelInfo[] >();
  const { data: mediaLists, refetch } = useQuery<
    { items: SSG_PO_MediaWithChannel[] },
    unknown,
    SSG_PO_MediaWithChannel[]
  >(
    [`/api/kobo/get-products`],
    () => fetch(`/api/ssgposetting/get-ssgpomedia`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  const [
    uptChannel,
    { loading: upt_loading, data: upt_data, error: upt_error },
  ] = useMutation<MutationResult>(
    `${FEcheckEnvironment().concat("/api/ssgposetting/udt-ssgchannels")}`,
    async () => {
      try {
        console.log("upt_data : ", upt_data);
        await refetch();
      } catch (error) {
        console.error("Error refetching data:", error);
      }
    }
  );
  const submitFn = async (
    data: string[],
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (confirm("수정하시겠습니까")) {
      try {
        await uptChannel({ data, media });
        // refetch();
        alert("수정완료");
        router.replace("/ssgpoSetting");
      } catch (e) {
        console.error("Error deleting user:", e);
        alert("수정에 실패했습니다.");
      }
    }
  };
  const calcleFn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await filterMedia();
    alert("취소완료");
    router.replace("/ssgpoSetting");
  };
  const filterMedia = useCallback(() => {
    const keyword = O.getOrElse(O.fromUndefined(media), "");
    const filteredMedia = mediaLists?.filter((el) => el.media === keyword);
    console.log("mediaLists : ", mediaLists);
    console.log("filteredMedia : ", filteredMedia);
    console.log("flatMap == isData : ",filteredMedia?.flatMap((el) => el.SSG_PO_Channel).map((el) => el.channel))
    console.log("media : ",media)
    setData(filteredMedia?.flatMap((el) => el.SSG_PO_Channel).map((el) => el.channel));
    setAllData(filteredMedia?.flatMap((el) => el.SSG_PO_Channel))
  }, [media, mediaLists]);
  useEffect(() => {
    filterMedia();
  }, [filterMedia]);
  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        {media}
        {isData && isData ? <span>({isData.length})</span> : null}
      </div>
      <div className="text-center">
        {/* isAllData == media에서 가져온것 */}
        {isAllData && isAllData.length > 0 ? (
          isAllData.map((el)=>{
            return(
              <div key={el.id}>
                <Link
                href={`/ssgpoSetting/${media}/materialCreate/${el.id}`}
                className="mb-3 inline-flex items-center gap-2 font-mono  text-gray-500 text-lg"
                >
                <span>
                  {el.channel}
                  <span>
                  
                  </span>
                </span>
                <ArrowRightIcon />
              </Link>
              </div>
            )
          })
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-center gap-5">
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

export default MeterialCreate;
