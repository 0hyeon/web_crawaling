import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Products() {
  // 더보기 상태관리
  const [skip, setSkip] = useState();
  // 페이지네이션 상태관리

  // 1.초기 랜더링view
  useEffect(() => {
    console.log("hi");
    fetch(`/api/scraper`)
      .then((res) => res.json()) // JSON 파싱
      .then((data) => setSkip(data.data))
      .catch((error) => console.error(error));
  }, []);

  return <div className="mt-36 mb-36">H{skip}</div>;
}
