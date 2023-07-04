export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com";

  return base_url;
};
//사용법
//  const getStaticProps = async (ctx: any) => {
//     const posts = await fetch(checkEnvironment().concat("/api/posts"));
//     const json = await posts.json();

//     return {
//       props: { data: json },
//     };
// };
