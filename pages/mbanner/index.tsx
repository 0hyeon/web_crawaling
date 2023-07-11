import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { MobieBanner } from "@prisma/client";
import { Input, Pagination, SegmentedControl, Select } from "@mantine/core";
import MenubarLeft from "@components/MenubarLeft";
import useDebounce from "@libs/client/useDebounce";
import { FILTERS, TAKE } from "@constants/banners";
import { useRouter } from "next/router";
import { format } from "date-fns";
import DateSchedule from "@components/DateSchedule";
// import Pie from "@components/Pie";
// import { pieData } from "@constants/data";

const MoBanner = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value);
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
  console.log(debouncedKeword);
  const { data: banners, refetch } = useQuery<
    { items: MobieBanner[] },
    unknown,
    MobieBanner[]
  >(
    [
      `/api/get-mobanner?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&orderBy=${selectedFilter}&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}`,
    ],
    () =>
      fetch(
        `/api/get-mobanner?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&orderBy=${selectedFilter}&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  useEffect(() => {
    refetch();
    setPage(1);
  }, [isDate, refetch]);

  const { data: total } = useQuery(
    [
      `/api/get-mobanner-count?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}`,
    ],
    () =>
      fetch(
        `/api/get-mobanner-count?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  );
  // const CRAWALING_QUERY_KEY = "/api/add-moWebcrawaling";
  // const { data: fetchData } = useQuery<{ items: any[] }, unknown, any[]>(
  //   [CRAWALING_QUERY_KEY],
  //   () => fetch(CRAWALING_QUERY_KEY).then((res) => res.json())
  //   // .then((res) => res.json())
  //   // .then((data) => data)
  // );
  // console.log("fetchData : ", fetchData);
  // useEffect(() => {
  //   console.log("useEffect실행");
  // }, [fetchData]);
  // console.log(banners);
  return (
    <>
      {/* 메뉴바 */}
      <MenubarLeft />

      <div className="h-[100%] w-full bg-[#dee2e6] pl-64">
        <div className="h-16 w-full bg-white px-12"></div>
        <div className="mx-4 mt-4 bg-white px-4 py-6">
          <div className="flex justify-between">
            {/* 셀렉바 */}
            <div className="w-52">
              <Select
                value={selectedFilter}
                onChange={setFilter}
                data={FILTERS}
              />
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
          {/* banner */}
          {banners && (
            <div className="mt-7 grid grid-cols-1">
              {banners?.map(
                (item: any, idx) =>
                  item?.src && (
                    <div
                      key={item.id}
                      className="relative mx-auto w-[40%] border-b-2 border-l-[3px] p-3"
                    >
                      {idx > 0 && item.date === banners[idx - 1].date ? null : (
                        <div
                          key={idx}
                          className="absolute left-[-11px] top-[-11px] h-[20px] w-[20px] rounded-xl border border-gray-300 bg-white"
                        >
                          <span className="absolute left-[-74px] top-[-3px]  w-[74px] text-sm text-gray-400">
                            {format(
                              new Date(item.createdAt),
                              // "yyyy년 M월 d일 HH시mm분"
                              "d일 HH시"
                            )}
                          </span>
                        </div>
                      )}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          className="min-w-full rounded"
                          alt={item.alt}
                          key={item.id}
                          src={
                            item.src
                              ? `https://imagedelivery.net/tUnns8TnvEqxOzjreCbU6w/${item.src}/public`
                              : ""
                          }
                          width={800}
                          height={290}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUUNWoBwAB6AD2lTrGfwAAAABJRU5ErkJggg==="
                        />
                      </a>
                      <div className="col-2 mt-3 flex flex-col">
                        <div className="mb-1 text-sm">
                          {format(
                            new Date(item.createdAt),
                            // "yyyy년 M월 d일 HH시mm분"
                            "yyyy년 M월 d일 HH시"
                          )}
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
          )}
          {/*페이지네이션*/}
          <div className="mt-20 flex w-full">
            {total && (
              <Pagination
                className="m-auto"
                value={activePage}
                onChange={setPage}
                total={total}
              />
            )}
          </div>
        </div>
        <div>{/* <Pie data={pieData} /> */}</div>
      </div>
    </>
  );
};

export default MoBanner;
