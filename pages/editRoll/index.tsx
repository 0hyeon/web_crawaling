import MenubarLeft from "@components/MenubarLeft";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "@mantine/core";
import React, { SyntheticEvent, useEffect, useState } from "react";
import * as O from "../../utils/option";
import { User } from "@prisma/client";

import { IconPhoto, IconDownload, IconArrowRight } from "@tabler/icons-react";
import useMutation from "@libs/client/useMutation";
import { MutationResult } from "types/type";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
const EditRoll = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedId, setSelectedId] = useState<number>();
  const { data: datas, refetch } = useQuery<{ items: User[] }, unknown, User[]>(
    [`/api/get-user`],
    () => fetch(`/api/get-user`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  const [delUser, { loading: del_loading, data: del_data, error: del_error }] =
    useMutation<MutationResult>(
      `${FEcheckEnvironment().concat("/api/del-user")}`,
      async () => {
        try {
          await refetch(); // 삭제가 성공했을 때 refetch를 호출하여 새로운 데이터를 가져옵니다.
        } catch (error) {
          console.error("Error refetching data:", error);
        }
      }
    );

  const userList = O.fromUndefined(
    datas
      ?.filter((element) => element.roll !== null)
      .sort((a, b) => a.roll! - b.roll!)
  );
  const userList_null = O.fromUndefined(
    datas?.filter((element) => element.roll === null)
  );
  O.getOrElse(userList, []);

  const combinedUserList = O.fromUndefined([
    ...O.getOrElse(userList, []),
    ...O.getOrElse(userList_null, []),
  ]);
  const handleConfirmSelection = () => {
    // 여기에서 선택된 값을 다루거나 처리할 수 있습니다.
    alert(`User selected: ${selectedValue}`);
    setIsModalOpen(false); // 모달 닫기
  };

  const onClickEdit = (id: number, e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("수정하시겠습니까")) {
      setIsModalOpen(true);
      setSelectedId(id);
    }
  };
  const onClickDel = async (
    id: number,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (confirm("삭제하시겠습니까")) {
      try {
        await delUser({ id: id });
        refetch();
      } catch (e) {
        console.error("Error deleting user:", e);
        alert("삭제하는 데 문제가 발생했습니다.");
      }
    }
  };

  const [udtUser, { loading: udt_loading, data: udt_data, error: udt_error }] =
    useMutation<MutationResult>(
      `${FEcheckEnvironment().concat("/api/udt-user")}`,
      async () => {
        try {
          await refetch(); // 삭제가 성공했을 때 refetch를 호출하여 새로운 데이터를 가져옵니다.
        } catch (error) {
          console.error("Error refetching data:", error);
        }
      }
    );
  const EditUser = async () => {
    try {
      const dataToUpdate = {
        id: selectedId,
        roll: selectedValue, // 선택된 값을 업데이트할 값으로 사용합니다.
      };
      // API 호출 및 업데이트
      await udtUser(dataToUpdate);
      // 업데이트 후 모달 닫기
      alert("변동되었습니다");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // 업데이트에 실패한 경우 에러 처리 로직을 추가합니다.
    }
  };

  const rows = O.mapOrElse(
    combinedUserList,
    (el) =>
      el.map((element: User) => (
        <tr key={element.id} className="h-8">
          <td>{element.name_2}</td>
          <td>{element.name}</td>
          {/* <td>{element.roll === null ? 3 :element.roll }</td> */}
          <td>
            {(() => {
              switch (element.roll) {
                case 1:
                  return "C레벨";
                case 2:
                  return "셀장";
                case 3:
                  return "과장";
                case 4:
                  return "대리";
                case 5:
                  return "사원";
                default:
                  return null;
              }
            })()}
          </td>
          <td>
            <button
              onClick={(e) => onClickEdit(element.id, e)}
              className="h-8 w-full rounded bg-blue-400 text-white duration-300 hover:bg-blue-300 hover:text-blue-500"
            >
              수정
            </button>
          </td>
          <td>
            <button
              onClick={(e) => onClickDel(element.id, e)}
              className="h-8 w-full rounded bg-red-400 text-white duration-300 hover:bg-red-300 hover:text-red-500"
            >
              삭제
            </button>
          </td>
        </tr>
      )),
    []
  );
  return (
    <>
      {isModalOpen && (
        <>
          <div className="fixed z-10 flex h-full w-full items-center justify-center bg-black opacity-70"></div>
          <div className="fixed left-[50%] top-[50%] z-20 h-[30%] w-[30%] translate-x-[-50%] translate-y-[-50%] bg-white">
            <div className="flex h-[100%] flex-col items-center justify-center gap-20">
              <select
                onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}
                className="w-[30%] border-black"
              >
                <option value="C레벨">C레벨</option>
                <option value="셀장">셀장</option>
                <option value="과장">과장</option>
                <option value="대리">대리</option>
                <option value="사원">사원</option>
              </select>
              <div className="flex gap-5">
                <button
                  className="rounded bg-black p-2 text-white"
                  onClick={EditUser}
                >
                  확인
                </button>
                <button
                  className="rounded bg-black p-2 text-white"
                  onClick={(prev) => setIsModalOpen(!prev)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="min-h-[100vh] w-full bg-white px-4 py-16">
          <div className="mx-auto w-[70%]">
            {userList && (
              <>
                <div className="mb-14 text-center text-2xl font-extrabold">
                  권한수정
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className="w-20">권한</th>
                      <th className="w-20">삭제</th>
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
};
export default EditRoll;
