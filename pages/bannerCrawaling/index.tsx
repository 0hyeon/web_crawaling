import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Products() {
  // 더보기 상태관리
  const [isData, setData] = useState();
  // 페이지네이션 상태관리

  // 1.초기 랜더링view
  useEffect(() => {
    let isMounted = true; // Add a flag to track mounted state

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/hello", {
          withCredentials: true,
          // headers: {
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          //   "Access-Control-Allow-Headers": "Content-Type",
          // },
        });
        const data = response.data;

        // 응답 데이터를 상태로 설정
        if (isMounted) {
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return <div className="mb-36 mt-36">Hello World</div>;
}
