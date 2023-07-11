// import { PrismaClient, Prisma } from "@prisma/client";
// const prisma = new PrismaClient();

// const getRandom = (max: number, min: number) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };
// const sneakers = [
//   {
//     name: `sneakers 1`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_blazer-mid-77-vintage_BQ6806-100.view_1_1024x.jpg?v=1583277417`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 2`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-trainer-1-sp_DH7338-300.view_1_1024x.jpg?v=1644514745`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 3`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_off_white-terra-forma_DQ1615-100.view_1_1024x.jpg?v=1671556989`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 4`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-max-1-prm_DZ0482-200.view_1_1024x.jpg?v=1671470462`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 5`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_waffle-one-se_DD8014-300.view_1_1024x.jpg?v=1647272915`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 6`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_sb-blazer-low-gt_704939-801.view_1_1024x.jpg?v=1638982610`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 7`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike-sb_fpar_zoom-blazer-low_DN3754-200.view_1.jpg?v=1640104686`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 8`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-force-1-mid-07_DJ9158-200.view_1_1024x.jpg?v=1646759512`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 9`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_sb-zoom-blazer-mid_864349-107.view_1_1024x.jpg?v=1636653220`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `sneakers 10`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 1,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-max-1-premium_CJ0609-700.view_1_1024x.jpg?v=1606177369`,
//     price: getRandom(300000, 100000),
//   },
// ];
// const tShirt = [
//   {
//     name: `tShirt 1`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_und_swatch-icon-ls-tee_80457.color_black.view_1_1024x.jpg?v=1670001686`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 2`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_bape_relaxed-sta-pattern-tee_1G80-109-007.color_black.view_1_1024x.jpg?v=1608665481`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 3`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_bape_tee_1TEI-731-920.color_green.view_1_1024x.jpg?v=1671816840`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 4`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_worldwide-ss-tee_80349.color_black.view_1_1024x.jpg?v=1666203616`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 5`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_crate-ls-tee_80358.color_grey.view_1_1024x.jpg?v=1666203846`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 6`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_la_dodgers-new-era-tee_80458.color_white.view_1_1024x.jpg?v=1665505820`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 7`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/vans_lqqk_ls_VN0A5417ZT4.color_brightorange.view_1_1024x.jpg?v=1605906178`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `tShirt 8`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 티셔츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 2,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_vault_patta_logo-t-shirt_VN0A7SO7BLK1.view_1_1024x.jpg?v=1626906041`,
//     price: getRandom(300000, 100000),
//   },
// ];
// const pants = [
//   {
//     name: `pants 1`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 팬츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 3,
//     image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx65oB6cHCDhDsnOE_FE8E3cZCL584RMFNTu7Yoxrc2mjD-WE0x709uy14sxe2ynhfqUo&usqp=CAU`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `pants 2`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 팬츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 3,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottom_nike_travis_scott-nrg-bh-pant_DM1280-220.color_velvetbrown.view_1_600x.jpg?v=1653582539`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `pants 3`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 팬츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 3,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_bape-forest-camo-track-pants_1F30-152-013.color_beige.view_2.jpg?v=1583188716`,
//     price: getRandom(300000, 100000),
//   },
// ];
// const cap = [
//   {
//     name: `cap 1`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 팬츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 4,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_new-era_fear_of-god-59fifty_60185371.view_1_600x.jpg?v=1629394765`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `cap 2`,
//     contents: `{"blocks":[{"key":"5f156","text":본제품은 팬츠입니다."type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 4,
//     image_url: ``,
//     price: getRandom(300000, 100000),
//   },
// ];
// const hoodie = [
//   {
//     name: `hoodie 1`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 5,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_vans_wtaps-po-hoodie_VN0A4TRBZXT.color_mandarinred.view_1_600x.jpg?v=1600974927`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `hoodie 2`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 5,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_jordan_essentials-statement-fleece-hoodie_DA9816-141.color_oatmealheather.view_1_600x.jpg?v=1659370058`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `hoodie 3`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 5,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_bape_color-camo-shark-wide-fit-full-zip-double_1H80-115-010.color_purple.view_2_600x.jpg?v=1639090701`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `hoodie 4`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 5,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_bape_flame-open-collar-shirt_1G30-131-011.color_orange.view_2_600x.jpg?v=1592933957`,
//     price: getRandom(300000, 100000),
//   },
//   {
//     name: `hoodie 5`,
//     contents: `{"blocks":[{"key":"5f156","text":"본제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b28o3","text":"this jean is perfect","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6k2sk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//     category_id: 5,
//     image_url: `https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_jordan_air-jordan-tee_DO6098-322.color_newemerald-sail.view_1_600x.jpg?v=1654533928`,
//     price: getRandom(300000, 100000),
//   },
// ];
// const productData: Prisma.productsCreateInput[] = [
//   ...sneakers,
//   ...tShirt,
//   ...pants,
//   ...cap,
//   ...hoodie,
// ];

// async function main() {
//   const CATEGORIES = ["SNEAKERS", "T-SHIRT", "PANTS", "CAP", "HOODIE"];
//   //카테고리추가
//   CATEGORIES.forEach(async (c, i) => {
//     const product = await prisma.categories.upsert({
//       where: {
//         id: i + 1,
//       }, //있다면
//       update: {
//         name: c,
//       }, ///없데이트
//       create: {
//         name: c,
//       }, //없다면 생성
//     });
//     console.log(`Upsert cateGory  : ${product.id}`);
//   });
//   await prisma.products.deleteMany({}); //다지우기
//   for (const p of productData) {
//     //상품생성
//     const product = await prisma.products.create({ data: p });
//     console.log(`Created Id : ${product.id}`);
//   }
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
