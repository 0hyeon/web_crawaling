import { atomFamily, atom, selector } from "recoil";
import { IToDoState } from "types/type";

export const toDoState = atomFamily<IToDoState, string>({
  key: "todos",
  default: {
    "가능 로직": [
      "특정카테고리추출",
      "다중중복제거",
      "PROD(adid3회이상제거)",
      "하나로취합",
    ],
    선택: [],
  },
});
