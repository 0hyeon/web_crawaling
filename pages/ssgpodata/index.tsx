import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { MobieBanner, SSG_PO } from "@prisma/client";
import { Input, Pagination, SegmentedControl, Select } from "@mantine/core";
import MenubarLeft from "@components/MenubarLeft";
import useDebounce from "@libs/client/useDebounce";
import { FILTERS, SSG_FILTERS, TAKE } from "@constants/banners";
import { useRouter } from "next/router";
import { format } from "date-fns";
import DateSchedule from "@components/DateSchedule";
import { LoadingText, Svg } from "pages/exceltrans";
import Loading from "public/asset/svg/Logo";
import { Table } from "@mantine/core";
import ExcelIcon from "public/asset/svg/ExcelIcon";
import { BEcheckEnvironment } from "@libs/server/useCheckEnvironment";
// import Pie from "@components/Pie";
// import { pieData } from "@constants/data";
const SsgPoData = () => {
  const [isResultPrice, setResultPrice] = useState<any>(0);
  const [isCount, setCount] = useState<any>(0);
  //매체
  const [SSGselectedMedia, SSGsetPdMedia] = useState<string | null>();
  //채널리스트
  const [isChannelList, SSGsetPdChannel] = useState<any>(
    SSG_FILTERS.map((el) => el.channels)
  );
  //채널
  const [isSelectedChannel, setSelectedChannel] = useState<any>();

  console.log("SSGselectedMedia : ", SSGselectedMedia);
  console.log("isSelectedChannel : ", isSelectedChannel);
  //채널찾기
  const filteredChannels = SSG_FILTERS.find(
    (filter) => filter.name === SSGselectedMedia
  )?.channels;

  const [isExcelIcon, setExcelIcon] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [activePage, setPage] = useState(1);
  const [isTradeCount, setTradeCount] = useState(0);

  const [isDate, setDate] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const getDate = useCallback(
    (startDay: string | null, lastDay: string | null) => {
      setDate([startDay, lastDay]);
    },
    [setDate]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const debouncedKeword = useDebounce<string>(keyword);
  const startDate = useDebounce<string | null>(isDate[0]);
  const lastDate = useDebounce<string | null>(isDate[1]);

  // 페이지네이션 fetching
  const ExcelBtn = () => {
    if (confirm("Excel? ")) {
      fetch(BEcheckEnvironment().concat("/po/ssgPoExcel"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: debouncedKeword,
          start: startDate,
          last: lastDate,
          media: SSGselectedMedia,
          channel: isSelectedChannel,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          // 비동기 작업이 완료되면 setLoading(false)를 호출
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "combined";
          a.click();
          // setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
  };
  const { data: total } = useQuery(
    [
      `/api/get-ssgPoData-count?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`,
    ],
    () =>
      fetch(
        `/api/get-ssgPoData-count?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  );
  // totalPrice
  const { data: totalPrice } = useQuery(
    [
      `/api/get-ssgpoTotalPrice?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`,
    ],
    () =>
      fetch(
        `/api/get-ssgpoTotalPrice?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  // PoData
  const { data: poData, refetch } = useQuery<
    { items: SSG_PO[] },
    unknown,
    SSG_PO[]
  >(
    [
      `/api/get-ssgPoData?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`,
    ],
    () =>
      fetch(
        `/api/get-ssgPoData?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  const rows = poData?.map((element, idx) => (
    <tr key={idx} className="text-[10px] ">
      <td>
        {/* <Image
          alt={"이미지"}
          src={"/images/cauly.png"}
          width={30}
          height={30}
        /> */}
        {element.media}
      </td>
      <td>{element.channel}</td>
      <td>{element.ordNo}</td>
      <td>{element.ordDts}</td>
      {/* <td>{element.itemId}</td> */}
      <td>{element.itemNm}</td>
      {/* <td>{element.stdCtgId}</td> */}
      <td>{element.rlordAmt?.toLocaleString("ko-kr")}</td>
      <td>{element.ordStatNm}</td>
      <td>{element.date}</td>
    </tr>
  ));

  useEffect(() => {
    const filteredChannels = SSG_FILTERS.find(
      (filter) => filter.name === SSGselectedMedia
    )?.channels;
    if (filteredChannels) {
      SSGsetPdChannel(filteredChannels);
    }
    setSelectedChannel([]);
  }, [SSGselectedMedia]);
  useEffect(() => {
    refetch();
    setPage(1);
    isDate[0] !== null && isSelectedChannel.length > 0
      ? setExcelIcon(true)
      : setExcelIcon(false);
  }, [isDate, filteredChannels, refetch, isSelectedChannel]);

  console.log("isDate : ", isDate);
  console.log("isExcelIcon : ", isExcelIcon);
  console.log("isSelectedChannel : ", isSelectedChannel);
  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />

      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-52">
                <span className="text-xs text-gray-600">매체명</span>
                <Select
                  value={SSGselectedMedia}
                  onChange={SSGsetPdMedia}
                  data={SSG_FILTERS.map((el) => el.name)}
                />
              </div>
              <div className="w-52">
                <span className="text-xs text-gray-600">채널명</span>
                <Select
                  value={isSelectedChannel}
                  onChange={setSelectedChannel}
                  data={SSGselectedMedia ? isChannelList : []}
                />
              </div>
              <div className="w-52">
                <span className="text-xs text-gray-600">건수</span>
                <Input
                  type="text"
                  value={totalPrice && totalPrice[1].toLocaleString("ko-kr")}
                />
              </div>
              <div className="w-52">
                <span className="text-xs text-gray-600">정산금액</span>
                <Input
                  type="text"
                  value={totalPrice && totalPrice[0].toLocaleString("ko-kr")}
                />
              </div>
              {isExcelIcon && isExcelIcon ? (
                <div
                  className="flex cursor-pointer flex-col items-baseline justify-around font-bold"
                  onClick={ExcelBtn}
                >
                  <span className="text-xs text-gray-600">Download Excel</span>
                  {/* <ExcelIcon width={25} height={25} fill={"#91979c"} /> */}
                </div>
              ) : null}
            </div>

            <div className="relative flex">
              {/* 달력 */}
              <DateSchedule getDate={getDate} />
              {/* 검색바 */}
              <div className="w-52">
                <Input
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-search"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                      <path d="M21 21l-6 -6" />
                    </svg>
                  }
                  placeholder="Search"
                  value={keyword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="max-w-8xl mx-auto mb-2 mt-12">
            <Table>
              <colgroup>
                <col width={"10%"} />
                <col width={"6%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"*"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
              </colgroup>
              <thead>
                <tr>
                  <th>매체</th>
                  <th>채널</th>
                  <th>원주문ID</th>
                  <th>SSG주문번호</th>
                  {/* <th>상품ID</th> */}
                  <th>상품명</th>
                  {/* <th>카테고리</th> */}
                  <th>실주문금액</th>
                  <th>주문상태</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>

          {/* banner */}
          {/* {banners && (
            <div className="mt-7 grid grid-cols-1">
              {banners?.map(
                (item: MobieBanner, idx) =>
                  item?.src && (
                    <div
                      key={item.id}
                      className="relative mx-auto w-[40%] border-b-2 border-l-[3px] p-3"
                    >
                      {idx > 0 &&
                      item.date?.slice(0, 13) ===
                        banners[idx - 1].date?.slice(0, 13) ? null : (
                        <div
                          key={idx}
                          className="absolute left-[-11px] top-[-11px] h-[20px] w-[20px] rounded-xl border border-gray-300 bg-white"
                        >
                          <span className="absolute left-[-74px] top-[-3px]  w-[74px] text-sm text-gray-400">
                            {item.date
                              ? format(
                                  new Date(item.date),
                                  // "yyyy년 M월 d일 HH시mm분"
                                  "d일 HH시"
                                )
                              : ""}
                          </span>
                        </div>
                      )}
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            className="min-w-full rounded"
                            alt={item.alt ? item.alt : ""}
                            key={item.id}
                            src={
                              item.src
                                ? `https://imagedelivery.net/tUnns8TnvEqxOzjreCbU6w/${item.src}/public`
                                : ""
                            }
                            width={800}
                            height={290}
                            placeholder="blur"
                            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                          />
                        </a>
                      ) : (
                        ""
                      )}
                      <div className="col-2 mt-3 flex flex-col">
                        <div className="mb-1 text-sm">
                          {item.date
                            ? format(
                                new Date(item.date),
                                // "yyyy년 M월 d일 HH시mm분"
                                "yyyy년 M월 d일 HH시"
                              )
                            : ""}
                        </div>
                        <div className="text-base font-bold">{item.title}</div>
                        <div className="text-sm font-light tracking-tight">
                          {item.alt}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )} */}
          {/*페이지네이션*/}
          <div className="mt-16 flex w-full">
            {total && total !== 0 ? (
              <Pagination
                className="m-auto"
                value={activePage}
                onChange={setPage}
                total={total}
                siblings={6}
              />
            ) : null}
            {/* {total === 0 ? (
              <>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={100}
                  height={100}
                >
                  <Loading />
                </Svg>
                <LoadingText>Nothing!!</LoadingText>
              </>
            ) : null} */}
          </div>
        </div>
        <div>{/* <Pie data={pieData} /> */}</div>
      </div>
    </>
  );
};

export default SsgPoData;
