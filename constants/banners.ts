export const CATEGORY_MAP = ["Sneakers", "T-shirts", "Pants", "Cap", "Hoodie"];
export const TAKE = 8;
export const FILTERS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "last" },
];
export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === "latest"
      ? { orderBy: { createdAt: "desc" } }
      : { orderBy: { createdAt: "asc" } }
    : { orderBy: { createdAt: "asc" } };
};
// getOrderBy 함수 수정
// export const getOrderBy = (orderBy?: string) => {
//   if (orderBy === "latest") {
//     return { createdAt: "desc" };
//   } else {
//     return { createdAt: "asc" };
//   }
// };
