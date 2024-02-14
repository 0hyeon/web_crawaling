export const FEcheckEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://web-crawaling.vercel.app";

  return base_url;
};
export const BEcheckEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1"
      : "https://sparta-yh.shop";
  return base_url;
};
//사용법
//  const getStaticProps = async (ctx: any) => {
//     const posts = await fetch(FEcheckEnvironment().concat("/api/posts"));
//     const json = await posts.json();

//     return {
//       props: { data: json },
//     };
// };

// function 광고지면호출api(){
//   const 앱설치유무 = () => {
//     //...앱설치유무 로직수행
//     return true
//   }
//   const 앱설치유무변수 = 앱설치유무()
//   const 호출주소 = '예시_greenbricks.co.kr'

//   const  지면호출로직 = async() => {
//     try {
//       const response = await axios.get(
//         `${호출주소}/api/addpost?`,
//       )
//       return response.data
//     } catch (error) {
//       console.error('트래킹 데이터 전송 중 오류 발생:', error)
//       throw error
//     }
//   }
//   앱설치유무변수 ? 지면호출로직() : null
// }
// 광고지면호출api()// 앱설치유무변수에 따라 호출하거나 null
