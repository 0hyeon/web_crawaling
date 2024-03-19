"use client";
import Layout from "@components/layout";
import React, { useCallback, useEffect, useState } from "react";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-grids/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-pivotview/styles/material.css";
import {
  CalculatedField,
  FieldList,
  IDataOptions,
  IDataSet,
  Inject,
  PivotViewComponent,
} from "@syncfusion/ej2-react-pivotview";
import DateSchedule from "@components/DateSchedule";
import { useQuery } from "@tanstack/react-query";
import { SSG_DFINARY, SSG_DFINARY_TrackingLinkList } from "@prisma/client";

const SSGDfnDataPage = () => {
  const [mappedData, setMappedData] = useState<SSG_DFINARY[]>([]);

  const { data: linklistData, refetch: linkListRefetch } = useQuery<
    { items: any[] },
    unknown,
    any[]
  >(
    [`/api/ssgposetting/ssgdfinaryTrackingList/get-trackingList`],
    () =>
      fetch(`/api/ssgposetting/ssgdfinaryTrackingList/get-trackingList`).then(
        (res) => res.json()
      ),
    {
      select: (data) => data.items,
      // .filter((item) => item.category === "ua_reportId"),
    }
  );
  const { data: dfnData, refetch } = useQuery<
    { items: SSG_DFINARY[] },
    unknown,
    SSG_DFINARY[]
  >(
    [`/api/ssgposetting/ssgdfinary/get-dfinary`],
    () =>
      fetch(`/api/ssgposetting/ssgdfinary/get-dfinary`).then((res) =>
        res.json()
      ),
    {
      select: (data) => data.items,
      // .filter((item) => item.category === "ua_reportId"),
    }
  );
  const dataSourceSettings: IDataOptions = {
    dataSource: mappedData as any,
    rows: [
      { name: "media", caption: "media" },
      { name: "channel", caption: "channel" },
      { name: "mall", caption: "mall" },
      { name: "platform", caption: "platform" },
      { name: "tracker", caption: "tracker" },
      { name: "materialName", caption: "materialName" },
      { name: "division_1", caption: "division_1" },
      { name: "division_2", caption: "division_2" },
      { name: "category", caption: "category" },
    ],
    expandAll: false,

    columns: [{ name: "daily", caption: "Daily" }],
    values: [
      { name: "클릭", caption: "클릭", showSubTotals: false },
      {
        name: "뉴인스톨",
        caption: "뉴인스톨",
        showSubTotals: false,
      },
      {
        name: "리인스톨",
        caption: "리인스톨",
        showSubTotals: false,
      },
      { name: "리오픈", caption: "리오픈", showSubTotals: false },

      { name: "결제건수", caption: "결제건수", showSubTotals: false },
      { name: "결제금액", caption: "결제금액", showSubTotals: false },
      { name: "첫구매", caption: "첫구매", showSubTotals: false },
      { name: "m가입자수", caption: "m가입자수", showSubTotals: false },
      { name: "m구매건수", caption: "m구매건수", showSubTotals: false },
      { name: "m신규가입자", caption: "m신규가입자", showSubTotals: false },
    ],
  };
  console.log("dfnData :", dfnData);
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
  useEffect(() => {
    if (dfnData && linklistData) {
      const filteredMapped = dfnData
        .filter((dfnary) =>
          linklistData.some(
            (trackingLink) => trackingLink.trackingLinkName === dfnary.tracker
          )
        )
        .map((dfnary) => {
          const matchingTrackingLink = linklistData.find(
            (trackingLink) => trackingLink.trackingLinkName === dfnary.tracker
          );

          switch (dfnary.platform) {
            case "2":
              dfnary.platform = "ios";
              break;
            case "1":
              dfnary.platform = "aos";
              break;
            default:
              dfnary.platform = "undefined";
              break;
          }

          let 클릭 = 0;
          let 뉴인스톨 = 0;
          let 리인스톨 = 0;
          let 리오픈 = 0;
          let 결제건수 = 0;
          let 결제금액 = 0;
          let 첫구매 = 0;
          let m가입자수 = 0;
          let m구매건수 = 0;
          let m신규가입자 = 0;
          if (dfnary.eventName === null) {
            dfnary.eventName = "ua"; // 변경: 할당 연산자로 수정
            클릭 = dfnary.clickCount || 0;
            뉴인스톨 = dfnary.newInstallClick || 0;
            리인스톨 = dfnary.reInstallClick || 0;
            리오픈 = dfnary.reOpen || 0;
          } else if (dfnary.eventName === "abx:purchase") {
            결제건수 = dfnary.uniqueView || 0;
            결제금액 = dfnary.sumValue || 0;
          } else if (dfnary.eventName === "custom:Firstorder") {
            첫구매 = dfnary.uniqueView || 0;
          } else if (dfnary.eventName === "custom:MembershipOrder") {
            m가입자수 = dfnary.uniqueView || 0;
            m구매건수 = dfnary.pageView || 0;
          } else if (dfnary.eventName === "custom:MembershipComplete") {
            m신규가입자 = dfnary.uniqueView || 0;
          }

          return {
            ...dfnary,
            trackingLink: matchingTrackingLink?.trackingLink,
            division_1: matchingTrackingLink?.division_1,
            division_2: matchingTrackingLink?.division_2,
            materialName: matchingTrackingLink?.materialName,
            channel: matchingTrackingLink?.channel?.channel,
            media: matchingTrackingLink?.channel?.media,
            mall: matchingTrackingLink?.mall,
            클릭,
            뉴인스톨,
            리인스톨,
            리오픈,
            결제건수,
            결제금액,
            첫구매,
            m가입자수,
            m구매건수,
            m신규가입자,
          };
        });
      setMappedData(filteredMapped); // 변경: 매핑된 데이터를 상태로 업데이트
    }
  }, [dfnData, linklistData]);
  console.log("linklistData :", linklistData);
  console.log("mappedData :", mappedData);
  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        SSG_DFN_대시보드
      </div>
      <div className="relative flex h-14">
        <DateSchedule getDate={getDate} />
      </div>
      <div>
        <PivotViewComponent
          id="PivotView"
          height={650}
          dataSourceSettings={dataSourceSettings}
          allowCalculatedField={true}
          showFieldList={true}
        >
          <Inject services={[CalculatedField, FieldList]} />
        </PivotViewComponent>
      </div>
    </Layout>
  );
};

export default SSGDfnDataPage;
