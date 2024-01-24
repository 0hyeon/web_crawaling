import MenubarLeft from "@components/MenubarLeft";
import { KoboGamesPdList } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as O from "../../../utils/option";
import { LoadingText, Svg } from "pages/exceltrans";
import Loading from "public/asset/svg/Logo";
import { Button, MultiSelect } from "@mantine/core";
import { useRouter } from "next/router";
import { MutationResult } from "types/type";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import useMutation from "@libs/client/useMutation";
export default function Index() {
  const router = useRouter();
  const [value, setValue] = useState<string[]>([]);
  const [value2, setValue2] = useState<string[]>([]);

  const [state, setSate] = useState({
    loading: false,
  });

  const [isData, setData] = useState<any>();

  const { data: KoboLists, refetch } = useQuery<
    { items: KoboGamesPdList[] },
    unknown,
    KoboGamesPdList[]
  >(
    [`/api/kobo/get-products`],
    () => fetch(`/api/kobo/get-products`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  useEffect(() => {
    const KoboList = O.fromUndefined(KoboLists);
    const KoboData = O.mapOrElse(
      KoboList,
      (kobo) => kobo.map((p, idx) => p.productname),
      []
    );
    const filteredKoboData = KoboData.filter(
      (item) => item !== null
    ) as string[];
    setData(filteredKoboData);
  }, [KoboLists]);

  //삭제저장
  const EditPage = () => {};
  const Refresh = () => {
    router.replace("/kobogames");
  };

  console.log("value : ", value);
  console.log("value2 : ", value2);
  const onChangeInput = (text: string) => {
    setValue2([text]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 엔터 키를 눌렀을 때 value2를 데이터에 추가
      setData((prevData: any) => [...(prevData || []), ...value2]);
      setValue2([]); // value2 초기화
    }
  };

  // const [delUser, { loading: del_loading, data: del_data, error: del_error }] =
  const [delUser] = useMutation<MutationResult>(
    `${FEcheckEnvironment().concat("/api/del-user")}`,
    async () => {
      try {
        await refetch(); // 삭제가 성공했을 때 refetch를 호출하여 새로운 데이터를 가져옵니다.
      } catch (error) {
        console.error("Error refetching data:", error);
      }
    }
  );

  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
          <div className="mx-auto w-[90%]">
            <div className="mx-auto w-[80%]">
              {state?.loading === true ? (
                <>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={100}
                    height={100}
                  >
                    <Loading />
                  </Svg>
                  <LoadingText>Loading...</LoadingText>
                </>
              ) : (
                <div className="">
                  <div className="mb-14 text-center font-sans text-2xl font-extrabold">
                    [코보게임즈] 이커머스 Process [...ing]
                  </div>

                  {/* 상품설정 */}
                  <div className="mx-auto mb-2 mt-20 w-[100%]">
                    {isData && isData.length > 0 ? (
                      <MultiSelect
                        label="All 상품명"
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
                  <div className="flex justify-center gap-5 ">
                    <Button className="bg-black" onClick={EditPage}>
                      저장
                    </Button>
                    <Button className="bg-gray-400" onClick={Refresh}>
                      취소
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
