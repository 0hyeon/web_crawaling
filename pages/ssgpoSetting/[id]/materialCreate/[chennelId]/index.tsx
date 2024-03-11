'use client'
import Layout from '@components/layout'
import useMutation from "@libs/client/useMutation";
import { FEcheckEnvironment } from '@libs/server/useCheckEnvironment';
import { SSG_PO_Channel } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { MutationResult } from 'types/type';
import { Table } from "@mantine/core";
import Link from 'next/link';
const MaterialPage = () => {
  const [isData , setData ] = useState('')
  const router = useRouter();
  const path = usePathname();
  const decodedPath = decodeURIComponent(path);
  const media = decodedPath.split("/")[2];

  // const [getMedia, { loading, data, error }] = useMutation<MutationResult>(
  //   `${FEcheckEnvironment().concat("/api/ssgposetting/materialCreate/get-ssgmeterial")}`
  // );
  
  const { data } = useQuery(
    [
      `/api/ssgposetting/materialCreate/get-ssgmeterial`,
    ],
    () =>
      fetch(
        `/api/ssgposetting/materialCreate/get-ssgmeterial`
      )
        .then((res) => res.json())
  );
  const calcleFn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await filterMedia();
    alert("취소완료");
    router.replace(`/ssgpoSetting/${media}/materialCreate/${router.query.chennelId}`);
  };

  useEffect(() => {
    if (data) {
      const selectedChannel = data?.result.filter((el: any) => el.media === media)[0];
      if (selectedChannel) {
        const selectedDfinary = selectedChannel.SSG_PO_Channel
          .filter((el: any) => el.id === Number(router.query.chennelId))[0]
          ?.SSG_DFINARY_TrackingLinkList;
        setData(selectedDfinary);
      }
    }
  }, [data, media, router.query.chennelId]);
  // console.log(isData.map((el:any)=>{el.id}))
  if (isData && Array.isArray(isData)) {
    console.log(isData.map((el: any) => el.materialName));
  }
  const rows =  isData && Array.isArray(isData) ? 
  isData.map((el: any) => { 
    return (
        <tr key={el.id} className="text-[10px] ">
          <td>{el.id}</td>
          <td>{el.channelId}</td>
          <td>{el.division_1}</td>
          <td>{el.division_2}</td>
          <td>{el.mall}</td>
          <td>{el.materialName}</td>
          <td>{el.mediaId}</td>
          <td><button
          onClick={(e) => calcleFn(e)}
          className="w-24 rounded-md bg-red-400 p-2 text-white"
        >
          삭제
        </button></td>
        </tr>
    )
  })
:null
  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        SSG 소재현황
      </div>
      <div className='min-w-full'>
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
              <th>id</th>
              <th>channelId</th>
              <th>구분1</th>
              <th>구분2</th>
              <th>몰</th>
              <th>소재명</th>
              <th>mediaId</th>
              <th>del</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <div className='mt-8 flex items-center justify-center gap-5'>
          {/* <button className="w-24 rounded-md bg-blue-500 p-2 text-white">추가</button> */}
          <Link
                href={`/ssgpoSetting/${media}/materialCreate/${router.query.chennelId}/create`}
                className="w-24 rounded-md bg-blue-500 p-2 text-white text-center"
          >추가</Link>
        </div>
        
      </div>
    </Layout>

  )
}

export default MaterialPage