import { PrismaClient, Prisma, PcBanner } from "@prisma/client";
import { bannerDate } from "./bannerData";
import { checkEnvironment } from "@libs/server/useCheckEnvironment";
const prisma = new PrismaClient();

async function main() {
  const splitBanner = bannerDate.split("\n");
  interface BannerInfo {
    id?: number;
    src: string;
    date: string;
    replaceName?: string;
    href: string;
  }
  console.log("splitBanner :", splitBanner);
  const ArrayData: BannerInfo[] = [];
  splitBanner.map((el) => {
    const splitData = el.split(`,"`)[0].slice(2).slice(0, -2).split(",");
    console.log(splitData);
    ArrayData.push({
      src: splitData[2].slice(2).slice(0, -1),
      date: splitData[8].slice(2).slice(0, -1),
      replaceName: splitData[3].slice(2).slice(0, -1),
      href: splitData[5].slice(2).slice(0, -1),
    });
  });
  const productData: Prisma.PcBannerCreateInput[] = [...ArrayData];
  let count = 0;
  for (const p of ArrayData) {
    const pcbanners: BannerInfo[] = [];

    const { src, replaceName, date, href } = p;

    const { uploadURL } = await (
      await fetch("http://localhost:3000/api/files")
    ).json();
    try {
      const responsefetch = await fetch("http://localhost:3000/api/files");
      if (!responsefetch.ok) {
        throw new Error(`Request failed with status ${responsefetch.status}`);
      }
      const { uploadURL } = await responsefetch.json();
      // Rest of your code
      const form = new FormData();
      const response = await fetch(src);
      const blob = await response.blob();
      form.append("file", blob, replaceName);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();

      pcbanners.push({
        src: id,
        href,
        date,
      });
      for (const d of pcbanners) {
        const banner = await prisma.pcBanner.createMany({ data: d });
        console.log(`Created Id ${count}`);
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (retry, show an error message, etc.)
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
