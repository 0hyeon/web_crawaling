import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import {
  MobieBanner,
  SSG_DFINARY,
  SSG_DFINARY_TrackingLinkList,
  SSG_PO,
  SSG_PO_Channel,
  SSG_PO_Media,
} from "@prisma/client";
import { Input, Pagination, SegmentedControl, Select } from "@mantine/core";
import MenubarLeft from "@components/MenubarLeft";
import useDebounce from "@libs/client/useDebounce";
import { FILTERS, SSG_FILTERS, TAKE } from "@constants/banners";
import DateSchedule from "@components/DateSchedule";
import Loading from "public/asset/svg/Logo";
import { Table } from "@mantine/core";
import { BEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import {
  useDfnData,
  useLinkListData,
  useTotalPriceQuery,
} from "data/getSSGData";
import { IEXTEND_SSG_TrackingLinkList } from "../../types/type";

const SsgPoDfnData = () => {
  const [isResultPrice, setResultPrice] = useState<any>(0);
  const [isCount, setCount] = useState<any>(0);
  const [SSGselectedMedia, SSGsetPdMedia] = useState<string | null>();
  const [isChannelList, SSGsetPdChannel] = useState<any>(
    SSG_FILTERS.map((el) => el.channels)
  );
  const [isSelectedChannel, setSelectedChannel] = useState<any>();
  const filteredChannels = SSG_FILTERS.find(
    (filter) => filter.name === SSGselectedMedia
  )?.channels;
  const [isExcelIcon, setExcelIcon] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [activePage, setPage] = useState(1);
  const [isMappedData, setMappedData] = useState<any[]>([]);
  const [isLinkListFilter, setLinkListFilter] = useState<any[]>([]);

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
  // TODO: MEDIA추가되어야 호출됨
  const { data: totalPrice } = useTotalPriceQuery(
    debouncedKeword,
    startDate,
    lastDate,
    SSGselectedMedia,
    isSelectedChannel
  );

  console.log("totalPrice : ", totalPrice);
  //매체선택시
  console.log("SSGselectedMedia : ", SSGselectedMedia);
  //채널선택시
  console.log("isSelectedChannel : ", isSelectedChannel);
  //DFN data
  const { data: linklistData, refetch: linkListRefetch } = useLinkListData();
  console.log("linklistData : ", linklistData);
  interface FilterItem {
    name: string;
    channels: string[];
  }

  const generateSSGFilters = useCallback(
    (
      linklistData: IEXTEND_SSG_TrackingLinkList[] | undefined
    ): FilterItem[] => {
      const mediaChannels: { [media: string]: string[] } = {};

      // linklistData를 반복하면서 각 미디어별로 채널을 그룹화
      linklistData?.forEach((entry) => {
        const media = entry.media.media;
        const channel = entry.channel.channel;

        // 이미 있는 미디어인지 확인하고 채널을 추가
        if (mediaChannels[media]) {
          if (!mediaChannels[media].includes(channel)) {
            mediaChannels[media].push(channel);
          }
        } else {
          mediaChannels[media] = [channel];
        }
      });

      // FilterItem 배열로 변환
      const filters: FilterItem[] = Object.entries(mediaChannels).map(
        ([media, channels]) => ({
          name: media,
          channels: channels.sort(), // 채널을 알파벳 순으로 정렬
        })
      );

      return filters;
    },
    []
  );
  // const generatedFilters = generateSSGFilters(linklistData);
  // console.log("generatedFilters  :", generatedFilters); // 생성된 필터 배열 출력

  const { data: dfnData, refetch: dfnRefetch } = useDfnData(
    startDate,
    lastDate
  );
  console.log("dfnData : ", dfnData);
  console.log("startDate,lastDate : ", startDate, lastDate);
  const rows = isMappedData?.map((element, idx) => (
    <tr key={idx} className="text-[10px]">
      <td>{element.media}</td>
      <td>{element.channel}</td>
      <td>{element.mall}</td>
      <td>{element.materialName}</td>
      <td>{element.daily}</td>
      <td>{element.platform}</td>
      <td>{element.division_1}</td>
      <td>{element.division_2}</td>
      <td>{element.tracker}</td>
      <td>{element.클릭.toLocaleString("ko-kr")}</td>
      <td>{element.뉴인스톨.toLocaleString("ko-kr")}</td>
      <td>{element.리인스톨.toLocaleString("ko-kr")}</td>
      <td>{element.리오픈.toLocaleString("ko-kr")}</td>
      <td>{element.첫구매.toLocaleString("ko-kr")}</td>
      <td>{element.m가입자수.toLocaleString("ko-kr")}</td>
      <td>{element.m구매건수.toLocaleString("ko-kr")}</td>
      <td>{element.m신규가입자.toLocaleString("ko-kr")}</td>
      <td>{element.결제건수.toLocaleString("ko-kr")}</td>
      <td>{element.결제금액.toLocaleString("ko-kr")}</td>
      {totalPrice && isSelectedChannel.length > 0 && totalPrice ? (
        <>
          <td>
            {totalPrice && totalPrice
              ? totalPrice && totalPrice[1].toLocaleString("ko-kr")
              : 0}
          </td>
          <td>
            {totalPrice && totalPrice
              ? totalPrice && totalPrice[0].toLocaleString("ko-kr")
              : 0}
          </td>
        </>
      ) : null}
    </tr>
  ));
  const setMappedDataCallback = useCallback((data: any) => {
    setMappedData(data);
  }, []);

  const mapData = useCallback(
    (
      dfnData: any[],
      linklistData: IEXTEND_SSG_TrackingLinkList[],
      setMappedDataCallback: (data: any) => void
    ) => {
      if (dfnData && linklistData) {
        const dataMap = new Map(); // Map을 생성하여 데이터를 누적할 준비

        // 먼저 dfnData와 linklistData를 이용해 데이터를 합치고 누적
        dfnData
          .filter((dfnary) =>
            linklistData.some(
              (trackingLink) => trackingLink.trackingLinkName === dfnary.tracker
            )//디파이너리에서 링크명이 등록된 링크명만 필터
          )
          .forEach((dfnary) => {
            const matchingTrackingLink = linklistData.find(
              (trackingLink) => trackingLink.trackingLinkName === dfnary.tracker
            );

            if (matchingTrackingLink) {
              const key = `${dfnary.daily}-${matchingTrackingLink.materialName}-${matchingTrackingLink.media.media}-${dfnary.tracker}-${matchingTrackingLink.trackingLink}`;
              console.log("key : ",key)
              if (!dataMap.has(key)) {
                // 맵에 키가 없으면 새로운 항목으로 추가
                dataMap.set(key, {
                  ...dfnary,
                  trackingLink: matchingTrackingLink.trackingLink,
                  division_1: matchingTrackingLink.division_1,
                  division_2: matchingTrackingLink.division_2,
                  materialName: matchingTrackingLink.materialName,
                  channel: matchingTrackingLink.channel.channel,
                  media: matchingTrackingLink.channel.media,
                  mall: matchingTrackingLink.mall,
                  클릭: 0,
                  뉴인스톨: 0,
                  리인스톨: 0,
                  리오픈: 0,
                  결제건수: 0,
                  결제금액: 0,
                  첫구매: 0,
                  m가입자수: 0,
                  m구매건수: 0,
                  m신규가입자: 0,
                });
              }

              // 데이터 누적
              const accumulatedData = dataMap.get(key);
              accumulatedData.클릭 += dfnary.clickCount || 0;
              accumulatedData.뉴인스톨 += dfnary.newInstallClick || 0;
              accumulatedData.리인스톨 += dfnary.reInstallClick || 0;
              accumulatedData.리오픈 += dfnary.reOpen || 0;
              accumulatedData.결제건수 += dfnary.uniqueView || 0;
              accumulatedData.결제금액 += dfnary.sumValue || 0;
              accumulatedData.첫구매 +=
                dfnary.eventName === "custom:Firstorder"
                  ? dfnary.uniqueView || 0
                  : 0;
              accumulatedData.m구매건수 +=
                dfnary.eventName === "custom:MembershipOrder"
                  ? dfnary.pageView || 0
                  : 0;
              accumulatedData.m가입자수 +=
                dfnary.eventName === "custom:MembershipComplete"
                  ? dfnary.uniqueView || 0
                  : 0;
              accumulatedData.m신규가입자 +=
                dfnary.eventName === "custom:MembershipComplete_ssg"
                  ? dfnary.uniqueView || 0
                  : 0;
              // 합쳐진 데이터를 맵에 다시 설정
              dataMap.set(key, accumulatedData);
            }
          });

        // 맵에서 합쳐진 데이터를 배열로 변환
        const filteredMapped = Array.from(dataMap.values())
          .filter((dfnary) => {
            return (
              (!SSGselectedMedia || dfnary.media === SSGselectedMedia) &&
              (!isSelectedChannel.length ||
                isSelectedChannel.includes(dfnary.channel)) &&
              (!isSelectedChannel.length ||
                (SSGselectedMedia && isSelectedChannel.length) ||
                (!SSGselectedMedia && isSelectedChannel.length === 0))
            );
          })
          .map((el) => {
            switch (el.platform) {
              case "2":
                el.platform = "ios";
                break;
              case "1":
                el.platform = "aos";
                break;
              default:
                el.platform = "undefined";
                break;
            }
            return el;
          });

        // 필터링된 데이터 설정
        setMappedDataCallback(filteredMapped);
      }
    },
    [SSGselectedMedia, isSelectedChannel]
  );
  //dfnData에서 등록되지 않은 소재들은 제외
  // Inside your component
  useEffect(() => {
    if (dfnData && linklistData) {
      /*dfnData 필터링*/
      mapData(dfnData, linklistData, setMappedDataCallback);
      /*링크리스트 필터링*/
      setLinkListFilter(generateSSGFilters(linklistData));
    }
  }, [
    dfnData,
    linklistData,
    setMappedDataCallback,
    mapData,
    SSGselectedMedia,
    isSelectedChannel,
    generateSSGFilters,
  ]);

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
    setPage(1);
    isDate[0] !== null && isSelectedChannel.length > 0
      ? setExcelIcon(true)
      : setExcelIcon(false);
  }, [isDate, filteredChannels, isSelectedChannel]);
  console.log("isMappedData : ", isMappedData);
  console.log("isSelectedChannel : ", isSelectedChannel);
  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />

      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="min-h-[100vh] w-full bg-white px-4 py-16">
          <div className="flex items-center justify-between">
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
              {/* {isExcelIcon && isExcelIcon ? (
                <div
                  className="flex cursor-pointer flex-col items-baseline justify-around font-bold"
                  onClick={ExcelBtn}
                >
                  <span className="text-xs text-gray-600">Download Excel</span>
                </div>
              ) : null} */}
            </div>

            <div className="relative flex items-center gap-3">
              {/* 달력 */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-red-500">*</span>
                <span className="text-xs">날짜를 지정해주세요</span>
              </div>
              <DateSchedule getDate={getDate} />
            </div>
          </div>
          <div className="mx-auto mb-2 mt-12 w-full">
            <Table>
              <colgroup>
                <col width={"15%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"10%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
                <col width={"100%"} />
              </colgroup>
              <thead>
                <tr>
                  <th className="min-w-[85px] text-center text-sm">매체</th>
                  <th className="min-w-[85px] text-center text-sm">채널</th>
                  <th className="min-w-[85px] text-center text-sm">몰</th>
                  <th className="min-w-[85px] text-center text-sm">소재명</th>
                  <th className="min-w-[85px] text-center text-sm">날짜</th>
                  <th className="min-w-[85px] text-center text-sm">OS</th>
                  <th className="min-w-[85px] text-center text-sm">구분1</th>
                  <th className="min-w-[85px] text-center text-sm">구분2</th>
                  <th className="min-w-[85px] text-center text-sm">링크명</th>
                  <th className="min-w-[85px] text-center text-sm">클릭</th>
                  <th className="min-w-[85px] text-center text-sm">뉴인스톨</th>
                  <th className="min-w-[85px] text-center text-sm">리인스톨</th>
                  <th className="min-w-[85px] text-center text-sm">리오픈</th>
                  <th className="min-w-[85px] text-center text-sm">첫구매</th>
                  <th className="min-w-[100px] text-center text-sm">
                    m가입자수
                  </th>
                  <th className="min-w-[100px] text-center text-sm">
                    m구매건수
                  </th>
                  <th className="min-w-[105px] text-center text-sm">
                    m신규가입자
                  </th>
                  <th className="min-w-[85px] text-center text-sm">결제건수</th>
                  <th className="min-w-[85px] text-center text-sm">결제금액</th>
                  {totalPrice && isSelectedChannel.length > 0 && totalPrice ? (
                    <>
                      <th className="min-w-[85px] text-center text-sm">
                        po건수
                      </th>
                      <th className="min-w-[85px] text-center text-sm">
                        po정산금액
                      </th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>

          {/*페이지네이션*/}
          <div className="mt-16 flex w-full">
            {/* {total && total !== 0 ? (
              <Pagination
                className="m-auto"
                value={activePage}
                onChange={setPage}
                total={total}
                siblings={6}
              />
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SsgPoDfnData;
