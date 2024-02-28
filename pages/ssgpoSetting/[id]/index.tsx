"use client";
import Layout from "@components/layout";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as O from "../../../utils/option";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import useMutation from "@libs/client/useMutation";
import { MutationResult } from "types/type";
import { useQuery } from "@tanstack/react-query";
import { SSG_PO_Channel, SSG_PO_Media } from "@prisma/client";
import {

  MultiSelect,
} from "@mantine/core";
import { useRouter } from "next/router";
export interface SSG_PO_MediaWithChannel extends SSG_PO_Media {
  channel: SSG_PO_Channel[];
}

const SSGPODetail = (props: any) => {
  const router = useRouter();
  const path = usePathname();
  const decodedPath = decodeURIComponent(path); // URL 디코딩
  const media = decodedPath.split("/")[2];

  const [value, setValue] = useState<string[]>([]);

  const [state, setSate] = useState({
    loading: false,
  });

  const [isData, setData] = useState<any>();

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

  // //삭제저장
  // const EditPage = () => {};
  // const Refresh = () => {
  //   router.replace("/kobogames");
  // };

  // console.log("value : ", value);
  // console.log("value : ", value);
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
  const onChangeInput = (text: string) => {
    setValue([text]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 엔터 키를 눌렀을 때 value를 데이터에 추가
      setData((prevData: any) => [...(prevData || []), ...value]);
      setValue([]); // value 초기화
    }
  };
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
    // const data = filterFn(O.getOrElse(O.fromUndefined(channels), []));
    // setValue(data);

    alert("취소완료");
    router.replace("/ssgpoSetting");
  };
  // const [delUser, { loading: del_loading, data: del_data, error: del_error }] =
  //   useMutation<MutationResult>(
  //     `${FEcheckEnvironment().concat("/api/del-user")}`,
  //     async () => {
  //       try {
  //         await refetch(); // 삭제가 성공했을 때 refetch를 호출하여 새로운 데이터를 가져옵니다.
  //       } catch (error) {
  //         console.error("Error refetching data:", error);
  //       }
  //     }
  //   );
  const filterMedia = useCallback(() => {
    const keyword = O.getOrElse(O.fromUndefined(media), "");
    const filteredMedia = mediaLists?.filter((el) => el.media === keyword);
    console.log("mediaLists : ", mediaLists);
    console.log("filteredMedia : ", filteredMedia);

    filteredMedia?.flatMap((el) => el.channel).map((el) => el.channel);
    setData(filteredMedia?.flatMap((el) => el.channel).map((el) => el.channel));
  }, [media, mediaLists]);

  useEffect(() => {
    filterMedia();
  }, [filterMedia]);
  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        {media}
      </div>
      <div>
        {isData && isData.length > 0 ? (
          <MultiSelect
            label={`${media} 채널`}
            placeholder="Pick value"
            data={isData ? isData : []}
            searchable
            defaultValue={isData ? isData : []}
            onChange={(el) => setValue(el)}
            onSearchChange={(el) => onChangeInput(el)}
            onKeyDown={onKeyDown}
          />
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

export default SSGPODetail;
