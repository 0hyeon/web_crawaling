import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Products() {
  // 더보기 상태관리
  const [isData, setData] = useState();
  // 페이지네이션 상태관리

  // 1.초기 랜더링view
  useEffect(() => {
    console.log("hi");
    fetch(`/api/scraper`)
      .then((res) => res.json()) // JSON 파싱
      .then((data) => {
        // 응답 데이터를 상태로 설정
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <div className="mb-36 mt-36">Hello World</div>;
}
