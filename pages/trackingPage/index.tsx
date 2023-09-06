import MenubarLeft from "@components/MenubarLeft";
import React from "react";
import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Tracking } from "@prisma/client";
import { format } from "date-fns";
function TrackingPage() {
  const { data: datas, refetch } = useQuery<
    { items: Tracking[] },
    unknown,
    Tracking[]
  >(
    [`/api/get-tracking`],
    () => fetch(`/api/get-tracking`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  console.log("datas : ", datas);
  const rows = datas?.map((element: Tracking) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.originId}</td>
      <td>{element.hashedId}</td>
      <td>{element.eventName}</td>
      <td>
        {element.createdAt
          ? format(new Date(element.createdAt), "yyyy년 M월 d일 HH시mm분")
          : ""}
      </td>
    </tr>
  ));
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 pt-16">
          <div className="mx-auto w-[70%]">
            {datas && (
              <>
                <div className="mb-14 text-center text-2xl font-extrabold">
                  트래킹 전체조회
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>OriginId</th>
                      <th>HashedId</th>
                      <th>EventName</th>
                      <th>CreateDate</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
