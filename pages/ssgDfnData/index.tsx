"use client";
import Layout from "@components/layout";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
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
import { pivotData } from "./datasource";
import DateSchedule from "@components/DateSchedule";
import { useQuery } from "@tanstack/react-query";
import { SSG_DFINARY, SSG_DFINARY_TrackingLinkList } from "@prisma/client";
const SSGDfnDataPage = () => {
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
    }
  );
  const dataSourceSettings: IDataOptions = {
    // columns: [{ name: "daily", caption: "Production Year" }],
    dataSource: dfnData as any,
    expandAll: false,
    filters: [],
    drilledMembers: [{ name: "Country", items: ["France"] }],
    formatSettings: [{ name: "Amount", format: "C0" }],
    rows: [{ name: "Country" }, { name: "Products" }],
    values: [
      { name: "Sold", caption: "Units Sold" },
      { name: "Amount", caption: "Sold Amount" },
    ],
  };
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

  console.log("isDate : ", isDate);
  console.log("dfnData : ", dfnData);
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
