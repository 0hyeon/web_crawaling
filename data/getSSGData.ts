import { useQuery } from "@tanstack/react-query";
import { IEXTEND_SSG_TrackingLinkList } from "pages/ssgDfnDataResult";

export const useTotalPriceQuery = (
  debouncedKeword: string,
  startDate: string | null,
  lastDate: string | null,
  SSGselectedMedia: string | null | undefined,
  isSelectedChannel: string | null
) => {
  return useQuery(
    [
      `/api/get-ssgpoTotalPrice?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`,
    ],
    async () =>
      startDate && startDate
        ? await fetch(
            `/api/get-ssgpoTotalPrice?&contains=${debouncedKeword}&startday=${startDate}&lastday=${lastDate}&media=${SSGselectedMedia}&channel=${isSelectedChannel}`
          ).then((res) => res.json())
        : null,
    {
      select: (data) => data.items,
    }
  );
};
export const useLinkListData = () => {
  return useQuery<
    { items: IEXTEND_SSG_TrackingLinkList[] },
    unknown,
    IEXTEND_SSG_TrackingLinkList[]
  >(
    [`/api/ssgposetting/ssgdfinaryTrackingList/get-trackingList`],
    async () =>
      await fetch(
        `/api/ssgposetting/ssgdfinaryTrackingList/get-trackingList`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
};
export const useDfnData = (
  startDate: string | null,
  lastDate: string | null
) => {
  return useQuery<{ items: any[] }, unknown, any[]>(
    [
      `/api/ssgposetting/ssgdfinary/get-dfinary?&startday=${startDate}&lastday=${lastDate}`,
    ],
    async () =>
      startDate && startDate
        ? await fetch(
            `/api/ssgposetting/ssgdfinary/get-dfinary?&startday=${startDate}&lastday=${lastDate}`
          ).then((res) => res.json())
        : null,
    {
      select: (data) => data.items,
    }
  );
};
