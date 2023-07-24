import type { NextPage } from "next";
import { bannerDate } from "prisma/bannerData";

const Home: NextPage = () => {
  const splitBanner = bannerDate.split("\n");
  interface BannerInfo {
    src: string;
    date: string;
    replaceName: string;
  }
  const ArrayData: BannerInfo[] = [];
  splitBanner.map((el) => {
    const splitData = el.split(`,"`)[0].slice(2).slice(0, -2).split(",");
    // console.log(splitData);
    ArrayData.push({
      src: splitData[2].slice(2).slice(0, -1),
      date: splitData[8].slice(2).slice(0, -1),
      replaceName: splitData[3].slice(2).slice(0, -1),
    });
  });
  // console.log(ArrayData);
  //const productData = [...bannerDate];
  return null;
};

export default Home;
