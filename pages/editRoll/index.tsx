import MenubarLeft from '@components/MenubarLeft'
import { useQuery } from '@tanstack/react-query';
import { Table } from "@mantine/core";
import React from 'react'
import * as O from "../../utils/option";
import { User } from '@prisma/client';
const EditRoll = () => {
  const { data: datas, refetch } = useQuery<
    { items: User[] },
    unknown,
    User[]
  >(
    [`/api/get-user`],
    () => fetch(`/api/get-user`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  const userList = O.fromUndefined(datas?.filter(element => element.roll !== null).sort((a, b) => (a.roll! - b.roll!)))
  const userList_null = O.fromUndefined(datas?.filter(element => element.roll === null));
  O.getOrElse(userList,[])

  const combinedUserList = O.fromUndefined([...O.getOrElse(userList,[]), ...O.getOrElse(userList_null,[])]);

  const rows = O.mapOrElse(
    combinedUserList,
    (el) =>
      el.map((element: User) => (
        <tr key={element.id}>
          <td>{element.name_2}</td>
          <td>{element.name}</td>
          <td>{element.roll}</td>
        </tr>
      )),
    []
  );

  return (
    <>
    <MenubarLeft />
    <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
      <div className="mx-4 min-h-[100vh] bg-white px-4 py-16">
        <div className="mx-auto w-[70%]">
            {userList && (
              <>
                <div className="mb-14 text-center text-2xl font-extrabold">
                  권한수정
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>OriginId</th>
                      <th>email</th>
                      <th>roll</th>
                      <th>수정</th>
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
  )
}
export default EditRoll