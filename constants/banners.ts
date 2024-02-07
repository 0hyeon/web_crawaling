import { OrderByCondition } from "types/type";

export const CATEGORY_MAP = ["Sneakers", "T-shirts", "Pants", "Cap", "Hoodie"];
export const TAKE = 16;
export const FILTERS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "last" },
];
export type SSGFilter = {
  name: string;
  channels: string[];
};
export const SSG_FILTERS: SSGFilter[] = [
  { name: "카울리", channels: ["re_caw1", "re_caw2", "re_caue1", "re_caue2"] },
  {
    name: "캐시슬라이드",
    channels: [
      "mid_cashslide_ssg1",
      "mid_cashslide_ssg2",
      "mid_cashslide_ssg3",
      "mid_cashslide_e1",
      "mid_cashslide_e2",
      "mid_cashslide_e3",
    ],
  },
  {
    name: "바리스타",
    channels: [
      "mid_brst_ssg1",
      "mid_brst_ssg2",
      "mid_brst_ssg3",
      "mid_brst_ssg4",
      "mid_brst_ssg5",
      "mid_brst_ssg6",
      "mid_brst_e1",
      "mid_brst_e2",
      "mid_brst_e3",
      "mid_brst_e4",
      "mid_brst_e5",
      "mid_brst_e6",
    ],
  },
  {
    name: "오락피드",
    channels: [
      "re_olock_ssg1",
      "re_olock_ssg2",
      "re_olock_ssg3",
      "re_olock_ssg4",
      "re_olock_ssg5",
      "re_olock_ssg6",
      "re_olock_e1",
      "re_olock_e2",
      "re_olock_e3",
      "re_olock_e4",
      "re_olock_e5",
      "re_olock_e6",
    ],
  },
  {
    name: "모지세",
    channels: [
      "moji_ssg1",
      "moji_ssg2",
      "moji_ssg3",
      "moji_ssg4",
      "moji_re1",
      "moji_re2",
    ],
  },
  { name: "버즈빌[CPS]", channels: ["re_buzz1", "buzz_e1"] },
  {
    name: "애드패커",
    channels: [
      "re_adpacker_ssg1",
      "re_adpacker_ssg2",
      "re_adpacker_ssg3",
      "re_adpacker_ssg4",
      "re_adpacker_ssg5",
      "re_adpacker_ssg6",
      "re_adpacker_ssg7",
      "re_adpacker_ssg8",
      "re_adpacker_ssg9",
      "re_adpacker_ssg10",
      "re_adpacker_e1",
      "re_adpacker_e2",
      "re_adpacker_e3",
      "re_adpacker_e4",
      "re_adpacker_e5",
      "re_adpacker_e6",
      "re_adpacker_e7",
      "re_adpacker_e8",
      "re_adpacker_e9",
      "re_adpacker_e10",
    ],
  },
  {
    name: "애피어_DCO",
    channels: [
      "app12_dco1",
      "app12_dco2",
      "app12_dco3",
      "app12_dco4",
      "appier_dcoe1",
      "appier_dcoe2",
      "appier_dcoe3",
      "appier_dcoe4",
    ],
  },
  {
    name: "RTB_하우스",
    channels: ["rtb_ssg1", "rtb_ssg2", "rtb_e1", "rtb_e2"],
  },
  { name: "몰로코", channels: ["ssg_re_moloco_dco", "emall_re_moloco_dco"] },
  { name: "피코나", channels: ["mid_pcona_ssg1", "mid_pcona_e1"] },
  { name: "모비온", channels: ["re_mobionssg1", "re_mobione1"] },
  { name: "버즈빌[RE]", channels: ["re_buzz1", "buzz_e1"] },
  { name: "크리테오", channels: ["re_criteo1", "criteo_re_1"] },
  {
    name: "애드픽",
    channels: [
      "ssg_adpick_cps1",
      "ssg_adpick_cps2",
      "ssg_adpick_cps3",
      "ssg_adpick_cps4",
      "ssg_adpick_cps5",
      "ssg_adpick_cps6",
      "ssg_adpick_cps7",
      "ssg_adpick_cps8",
      "ssg_adpick_cps9",
      "ssg_adpick_cps10",
      "e_adpick_cps1",
      "e_adpick_cps2",
      "e_adpick_cps3",
      "e_adpick_cps4",
      "e_adpick_cps5",
      "e_adpick_cps6",
      "e_adpick_cps7",
      "e_adpick_cps8",
      "e_adpick_cps9",
      "e_adpick_cps10",
    ],
  },
];

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
