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
      : "https://sparta-yh.store";
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
