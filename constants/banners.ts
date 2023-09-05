export const CATEGORY_MAP = ["Sneakers", "T-shirts", "Pants", "Cap", "Hoodie"];
export const TAKE = 16;
export const FILTERS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "last" },
];
export interface OrderByCondition {
  orderBy: {
    date: "asc" | "desc";
  };
}
export const getOrderBy = (orderBy?: string): OrderByCondition => {
  return orderBy
    ? orderBy === "latest"
      ? { orderBy: { date: "desc" } }
      : { orderBy: { date: "asc" } }
    : { orderBy: { date: "asc" } };
};
// getOrderBy 함수 수정
// export const getOrderBy = (orderBy?: string) => {
//   if (orderBy === "latest") {
//     return { createdAt: "desc" };
//   } else {
//     return { createdAt: "asc" };
//   }
// };
