import { atomFamily, atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atomFamily({
  key: "todos",
  default: {
    "가능 로직": ["다중중복제거", "PROD(adid3회이상제거)", "하나로취합"],
    선택: [],
  },
});
